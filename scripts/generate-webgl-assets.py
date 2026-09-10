import os
import shutil
from PIL import Image, ImageFilter
import numpy as np

os.makedirs("public/textures", exist_ok=True)

SOURCE_IMG = "public/1757983784523_edit_18156554308333.jpg"
if not os.path.exists(SOURCE_IMG):
    raise FileNotFoundError(f"Source image not found: {SOURCE_IMG}")

img = Image.open(SOURCE_IMG).convert("RGBA")
w, h = img.size
print(f"Loaded new photo: {w}x{h}")

# Save base texture
base_jpg = "public/textures/character-base.jpg"
img.convert("RGB").save(base_jpg, "JPEG", quality=95)
# Also copy to public/character-underwater.jpg for reference
shutil.copy2(SOURCE_IMG, "public/character-underwater.jpg")
print(f"Saved base texture: {base_jpg}")

# --- 1. Extract Goldfish Sprites from New Photo ---
fish_configs = [
    {"name": "fish-1.png", "box": (150, 840, 330, 970), "thresh": 20}, # Bottom-left foreground
    {"name": "fish-2.png", "box": (525, 830, 685, 965), "thresh": 20}, # Bottom-center foreground
    {"name": "fish-3.png", "box": (835, 395, 990, 500), "thresh": 18}, # Mid-right near shoulder
    {"name": "fish-4.png", "box": (90, 230, 245, 330), "thresh": 16},  # Top-left background
    {"name": "fish-5.png", "box": (175, 680, 255, 795), "thresh": 16}, # Bottom-left mid
    {"name": "fish-6.png", "box": (215, 380, 295, 475), "thresh": 16}, # Mid-left upper
    {"name": "fish-7.png", "box": (905, 620, 1015, 725), "thresh": 18},# Far-right mid
]

for item in fish_configs:
    crop = img.crop(item["box"])
    arr = np.array(crop, dtype=np.float32)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    
    # Orange separation metric: R > G and R > B
    diff = r - (g * 0.6 + b * 0.65)
    alpha = np.clip((diff - item["thresh"]) / 30.0, 0.0, 1.0)
    
    ch, cw = alpha.shape
    y_grad = np.sin(np.linspace(0, np.pi, ch))[:, None] ** 0.5
    x_grad = np.sin(np.linspace(0, np.pi, cw))[None, :] ** 0.5
    alpha = alpha * y_grad * x_grad
    
    alpha_img = Image.fromarray((alpha * 255).astype(np.uint8), mode="L")
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=0.8))
    
    crop.putalpha(alpha_img)
    out_path = os.path.join("public/textures", item["name"])
    crop.save(out_path, "PNG")
    print(f"Extracted {item['name']}: {crop.size}")

# --- 2. Generate Customized Depth Map for Khoa Vo's Pose ---
# In this photo:
# - Center of head: x ~ 560, y ~ 370
# - Sunglasses & face profile: x ~ 440-620, y ~ 300-500
# - Prayer hands: x ~ 620-750, y ~ 430-740
# - Forearms resting forward: x ~ 350-960, y ~ 700-1000
# - Torso & white shirt: x ~ 370-960, y ~ 450-900
# - Background sofa / aquarium / water surface: x ~ 0-400, y ~ 150-700
y_idx, x_idx = np.indices((1024, 1024), dtype=np.float32)

# Ambient water depth gradient
depth = 0.12 + 0.06 * (1.0 - y_idx / 1024.0)

# Sofa in left background (has modest depth)
sofa_mask = (x_idx < 400) & (y_idx > 380) & (y_idx < 800)
depth[sofa_mask] = 0.22

# Torso & white shirt
torso_dist = ((x_idx - 660) / 280)**2 + ((y_idx - 720) / 260)**2
torso_mask = np.clip(1.0 - torso_dist, 0.0, 1.0)
depth += 0.45 * (torso_mask ** 0.8)

# Head & hair
head_dist = ((x_idx - 570) / 140)**2 + ((y_idx - 320) / 160)**2
head_mask = np.clip(1.0 - head_dist, 0.0, 1.0)
depth += 0.40 * (head_mask ** 0.8)

# Face turned left & sunglasses
face_dist = ((x_idx - 500) / 90)**2 + ((y_idx - 390) / 90)**2
depth += 0.12 * np.clip(1.0 - face_dist, 0.0, 1.0)

# Hands clasped in prayer (elevated, close to chest/camera)
hands_dist = ((x_idx - 685) / 65)**2 + ((y_idx - 580) / 140)**2
depth += 0.30 * (np.clip(1.0 - hands_dist, 0.0, 1.0) ** 0.7)

# Forearms resting on front ledge (very close to viewer)
forearms_dist = ((x_idx - 620) / 280)**2 + ((y_idx - 880) / 120)**2
depth += 0.35 * (np.clip(1.0 - forearms_dist, 0.0, 1.0) ** 0.6)

# Foreground fish 1 & 2
f1_dist = ((x_idx - 240) / 90)**2 + ((y_idx - 900) / 60)**2
depth += 0.28 * np.clip(1.0 - f1_dist, 0.0, 1.0)
f2_dist = ((x_idx - 605) / 80)**2 + ((y_idx - 890) / 60)**2
depth += 0.28 * np.clip(1.0 - f2_dist, 0.0, 1.0)

# Normalize
depth = np.clip(depth, 0.0, 1.0)

# Gaussian smooth for organic displacement surface
depth_img = Image.fromarray((depth * 255).astype(np.uint8), mode="L")
depth_img = depth_img.filter(ImageFilter.GaussianBlur(radius=16))
depth_path = "public/textures/character-depth.png"
depth_img.save(depth_path, "PNG")
print(f"Generated customized depth map: {depth_path} (1024x1024)")
print("Asset generation for new photo complete!")
