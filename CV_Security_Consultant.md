# VÕ NGUYỄN ĐĂNG KHOA (Khoa Vo)
### Security Consultant — Information Security, Risk & Secure System Design

📍 Ho Chi Minh City, Vietnam (UTC+7) | 📧 [vonguyendangkhoa@gmail.com](mailto:vonguyendangkhoa@gmail.com) | 📱 (+84) 398 300 340 | 🔗 [linkedin.com/in/khoa-vo-76291236](https://www.linkedin.com/in/khoa-vo-76291236/)  
💻 [github.com/vndangkhoa](https://github.com/vndangkhoa) | 🖥️ Homelab: Synology NAS cluster + Forgejo CI/CD ([git.khoavo.myds.me/vndangkhoa](https://git.khoavo.myds.me/vndangkhoa))

> **Security-minded systems and solutions engineer with 9+ years in technology and 4+ years designing security controls into production systems from the ground up**: cryptographic licensing, forensic anti-leak DRM, multi-factor authentication, directory-traversal sandboxing, and tamper detection. Combines deep hands-on implementation (Go, Rust, TypeScript) with enterprise digital asset governance across Southeast Asia (Procter & Gamble). I approach every system as a consultant would: identify the threat model first, design controls proportional to risk, and document them so technical and non-technical stakeholders alike can make informed decisions.

---

## 🎯 Core Competencies → JD Alignment

| JD Requirement | Evidence from My Work |
|---|---|
| **Analyse non-normative flows to identify risks, threats & vulnerabilities** | Built forensic anti-leak DRM ([`ola`](https://git.khoavo.myds.me/vndangkhoa/ola)): threat-modeled screen-recording, window-blur & DevTools inspection as leak vectors; designed runtime countermeasures (auto-blank, dynamic watermarking). Designed kernel input isolation in [`vietc`](https://git.khoavo.myds.me/vndangkhoa/vietc) eliminating keystroke injection and race conditions. |
| **Design security controls & countermeasures** | Implemented **Argon2id** password hashing, **RFC 6238 TOTP 2FA**, **Ed25519-signed** offline licensing, filesystem sandboxing (`dunce::canonicalize` to eliminate directory traversal), per-IP rate limiting, and CORS origin allow-lists across [`kv-file-pro`](https://git.khoavo.myds.me/vndangkhoa/kv-file-pro) and [`kv-tube`](https://git.khoavo.myds.me/vndangkhoa/kv-tube). |
| **Manage technical deviations & compensating controls** | Embedded target ([`kv-trimui`](https://git.khoavo.myds.me/vndangkhoa/kv-trimui)) constrained by legacy GLIBC ~2.28 and missing display servers → engineered compensating controls: 100% static Musl cross-compilation pipeline, direct memory-mapped `/dev/fb0` rendering, and process lifecycle containment (`SIGSTOP`/`SIGCONT`) so controls survive platform limitations. |
| **Leverage & develop control reference patterns** | Auth/security layer abstracted and reused across `kv-file`, `kv-file-pro`, and `ola`; `cook.sh` single-source release pipeline enforcing identical, auditable build & publish controls across 13+ apps. Designed 42-tool Model Context Protocol (MCP) security boundary pattern in [`kv-synology`](https://git.khoavo.myds.me/vndangkhoa/kv-synology). |
| **Proactively manage risk when designs change posture** | Supply-chain controls: dual-mirror releases (GitHub + Forgejo), automated GnuPG cryptographic package signing ([`spkrepo`](https://git.khoavo.myds.me/vndangkhoa/spkrepo)), exact byte-size checksums in `catalog.json`, smart-sync API dedup, auto-purge of deprecated assets. |
| **Influence & communicate with non-security stakeholders** | Bilingual (EN/VI) technical documentation, "Simple Mode" hiding OS complexity for non-technical users, competitive-matrix documentation translating technical security trade-offs into commercial business value. Directed Fortune 500 brand compliance at **P&G** and enterprise AI SOPs at **Phibious**. |
| **Governance, audit & assurance** | Audit-log retention policy (90-day prune, SQLite WAL checkpoints every 30 min), session-token handling standards documented (e.g., `cookies.txt` handling rules), Btrfs RAID immutable snapshot replication, and automated CI/CD release assurance. |

---

## 🛡️ Selected Security-Engineering Projects

### Ola — Forensic Anti-Leak DRM Client Review Platform *(Go, React, Synology SPK)*
*Secure review workflow for creative agencies handling terabytes of high-value media on-premises — the "zero-leak" alternative to cloud SaaS ([`ola`](https://git.khoavo.myds.me/vndangkhoa/ola)).*
- **Threat-modeled insider-leak vectors** and implemented **dynamic forensic watermarking** embedding reviewer IP, timestamp, session ID, and identity across video frames — enabling post-incident attribution *(JD: identify threats → countermeasures)*.
- Designed **tamper detection & response**: actively detects screen recorders, window blur, and DevTools inspection; automatically interrupts playback and blanks the viewport.
- Built **time-limited dispatch links** with passcodes, max-view limits, and automated expiration dates — enforcing access control proportional to risk appetite.
- Engineered **audit & assurance**: SQLite WAL (256 MB mmap, WAL checkpoint every 30 min), 90-day audit retention policy, and native DSM notification integration.
- **Zero-config P2P NAT-traversal tunnel** (`wss://acl.vndns.net/tunnel`) eliminating public WAN port exposure.

### KV Files PRO — "Military-Grade" Secure File Manager *(Rust: Axum + Tokio, SQLite WAL)*
*Commercial/enterprise file manager; single static binary, ~15 MB RAM ([`kv-file-pro`](https://git.khoavo.myds.me/vndangkhoa/kv-file-pro)).*
- Implemented **defense-in-depth authentication**: Argon2id password hashing + RFC 6238 TOTP 2FA with live QR enrollment.
- Eliminated **directory traversal and symlink escape risks** via strict filesystem sandboxing with `dunce::canonicalize` path validation.
- Designed **asymmetric Ed25519 offline licensing**: licenses signed with a private key and verified offline against an embedded public key — no phone-home DRM, allowing clients to maintain full air-gapped sovereign control.
- Public share portals with **expiring, password-protected tokens** (`/share/{token}`) and on-the-fly streaming encrypted zip archives.

### KV-TrimUI — 13-App Media Suite for Embedded Linux Handhelds *(Rust, Next.js 15, Musl)*
*Open-source native software ecosystem (GPL-3.0) for TrimUI Smart Pro / Brick Pro (Allwinner A133) ([`kv-trimui`](https://git.khoavo.myds.me/vndangkhoa/kv-trimui)).*
- **Supply-chain integrity**: dual-mirror release pipeline (GitHub + Forgejo) with exact byte-size verification in `catalog.json`, automated deprecated-asset purging, and retry-safe API publishing.
- **Platform risk engineering**: legacy GLIBC (~2.28) identified as deployment risk → mandated `aarch64-unknown-linux-musl` static linking across all binaries as a compensating control.
- **Process & resource isolation**: suspend/resume lifecycle control of the stock OS launcher (`SIGSTOP`/`SIGCONT`), static Musl daemons consuming <1–15 MB RAM, and direct `/dev/fb0` rendering with zero third-party telemetry.
- **Zero-tracking architecture by design**: direct stream extraction, no accounts, no analytics — privacy and attack surface reduction treated as foundational requirements.
- **Network perimeter protection ([`kv-server`](https://git.khoavo.myds.me/vndangkhoa/kv-trimui/src/branch/main/apps/kv-server))**: integrated Cloudflare Zero-Trust Tunnels (`cloudflared`), token-based HTTP authentication (`?auth=token`), and localhost loopback binding (`127.0.0.1`), removing firewall port forwarding requirements.

### SysVis.AI — Systems Architecture & Threat Modeling Visualizer *(React 19, TypeScript, WebGPU)*
*Interactive system design visualizer for mapping infrastructure topologies, trust boundaries, and data flows ([`Sys-Arc-Visl`](https://git.khoavo.myds.me/vndangkhoa/Sys-Arc-Visl)).*
- Designed for **Technology Architecture Forums** to outline conceptual and logical security architectures, component interfaces, and threat boundaries.
- **Privacy-preserving local-first AI**: executes WebLLM (Qwen3) and Transformers.js (ViT-GPT2) directly in-browser via WebGPU, guaranteeing that sensitive enterprise architecture schemas never leave the local machine.

### KV-Synology & SPKRepo — Package Center & AI Control Plane *(Next.js 15, Docker, GnuPG)*
*Community Package Center server and enterprise NAS management control plane ([`kv-synology`](https://git.khoavo.myds.me/vndangkhoa/kv-synology)).*
- **Cryptographic supply-chain validation**: automated packaging pipeline with **GnuPG key signing**, validating SPK package integrity before installation in DSM 7.2+.
- **AI Agent Permission Boundaries**: engineered a 42-tool Model Context Protocol (MCP) server establishing strict execution boundaries and least-privilege tool invocations.
- **Service hardening**: one-click daemon toggles replacing insecure cleartext protocols (Telnet, plain FTP) with encrypted channels (SSH, SFTP, WebDAV over TLS).

### KV-Tube — Self-Hosted Media Platform *(Go/Gin, Next.js, Kotlin Android/TV)*
- Per-IP **rate limiting** (300 req/min, burst 120) and explicit **CORS origin allow-lists** in the Go backend.
- Containerized 4-service architecture enforcing network segmentation (internal-only DB & companion services).
- Anti-bot resilience: browser impersonation (`curl_cffi`) with 3× smart retry on transient failures.

### KV-Download — Multi-Platform Download Service *(Go, yt-dlp)*
- Documented **session-token threat handling** (`cookies.txt` = session tokens: never commit, never share, mount writable-only) — embedding secure-handling guidance directly into operational documentation.
- Proxy support, auto-updating extraction engine, and cron-based cleanup controls.

### Viet+ (VietC) — Vietnamese IME for Linux *(Rust — 60⭐ Community Project)*
- **Rootless privilege design**: systemd user service with minimal uinput permission grant — least-privilege by default.
- Precise hardware input-device filtering (`/dev/input/by-path/*-event-kbd`) to eliminate input-injection edge cases and keystroke sniffing from rogue USB dongles.

---

## 🏠 Infrastructure & DevOps (Homelab Architecture)

- **Self-hosted Forgejo** instance with Docker runner clusters and automated cloud sync — hands-on experience operating source-control, code review, and CI/CD governance.
- **Multi-arch container registries** (Docker Hub, GHCR, dual Forgejo mirrors) with automated multi-arch builds (`amd64`/`arm64`).
- **Synology DSM ecosystem**: SPK packaging (DSM 6.x/7.x), Container Manager stacks, Btrfs RAID immutable snapshot replication, and automated Let's Encrypt wildcard SSL rotation via Nginx reverse proxy.

---

## 💼 Professional Experience

### **Lead Security Architecture & Infrastructure Consultant**
**KV Self-Hosted Labs & Open-Source Security Solutions** | *Ho Chi Minh City, Vietnam*  
*2023 – Present*
- Architected and deployed secure self-hosted platforms serving 7+ production packages, integrating GnuPG supply chain signing, Argon2id/TOTP identity verification, and Ed25519 asymmetric cryptographic licensing.
- Defined conceptual and logical security architectures for distributed microservices, evaluating non-normative flows and implementing compensating controls for resource-constrained edge environments.
- Formulated threat modeling frameworks and anti-leak forensic DRM mechanisms, eliminating data exfiltration risks for high-value on-premises creative media.
- Maintained 99.9% uptime across self-hosted infrastructure with automated wildcard SSL rotation, Cloudflare Zero-Trust tunnels, and Btrfs snapshot replication.

### **Creative Technology & AI Governance Lead**
**Phibious Vietnam** | *Ho Chi Minh City, Vietnam*  
*2025 – Present*
- Formulated enterprise technical SOPs, AI governance standards, and data privacy guardrails for generative AI pipelines (ComfyUI, FLUX.1 LoRA, Runway Gen-3) across Fortune 500 accounts.
- Established strict input isolation and prompt security protocols to protect proprietary client brand assets and confidential creative IP from unauthorized leakage.
- Acted as trusted advisor to regional managing directors and brand custodians, translating technical and compliance trade-offs into commercial business value and achieving a **60% acceleration in production turnaround**.
- Directed departmental GPU compute budgeting and operational ROI while mentoring 20+ producers and technical practitioners on data hygiene and security review frameworks.

### **eCommerce Digital Asset Governance & Regional Lead**
**Procter & Gamble (P&G) Southeast Asia** | *Ho Chi Minh City, Vietnam*  
*2020 – 2025*
- Governed regional digital asset integrity, security compliance, and brand protection across 6 Southeast Asian markets for P&G Hair Care portfolio (Head & Shoulders, Pantene, Rejoice).
- Enforced corporate brand risk policies across 200+ campaign deliverables quarterly, ensuring compliance with regional data, consumer advertising, and digital platform standards.
- Designed an enterprise modular design system with 500+ standardized components, enabling **3× faster asset adaptation** while eliminating unauthorized design deviations.
- Established automated quality assurance (QA) frameworks that reduced post-launch compliance deviations by 40%, aligning cross-functional marketing, engineering, and product stakeholders.

### **Earlier Career Experience**
- **Production Creative Lead** — INN SaiGon *(Dec 2019 – Nov 2020)*: Directed production operations for 30+ enterprise client accounts, implementing strict QA review frameworks and reducing post-production error rates by 40%.
- **Regional Head of Design** — ASIAMARINE *(2018 – 2019)*: Governed digital collateral, web infrastructure, and brand compliance for a premier luxury marine brokerage across Southeast Asia.
- **Senior Digital Designer** — EMG (Element Management Group) *(2017 – 2018)*: Produced digital and print campaigns for multinational luxury, automotive, and hospitality brands.

---

## 🎓 Education & Certifications

- **Bachelor of Multimedia Design** — **RMIT University Vietnam** *(2012 – 2016)*  
  *Accredited Australian University curriculum delivered 100% in English.*  
  *Honors:* **Best Artistic Graduate Showcase (2016)**.
- **Security Certifications & Professional Commitments:**  
  * Currently preparing for and committed to obtaining **CISSP (Certified Information Systems Security Professional)** and **CCSP (Certified Cloud Security Professional)**.  
  * Practical grounding in Threat Modeling (STRIDE, DREAD), OWASP Top 10, NIST Cybersecurity Framework (CSF), and ISO 27001 / APRA CPS 234 control principles.
- **Languages:** English (Full Professional Proficiency / Bilingual Working Standard), Vietnamese (Native).

---

## 🧩 Essential Capabilities (per JD) — Evidence

| Capability | Example from My Work |
|---|---|
| **Decision Quality** | Chose offline Ed25519 asymmetric licensing over phone-home SaaS DRM after weighing client-trust risk, air-gapped usability, and sovereignty vs. piracy risk. |
| **Strategic Mindset** | Positioned `ola` as an on-premises "zero-leak" alternative to Frame.io — transforming security and data residency into a commercial business differentiator rather than a cost center. |
| **Situational Adaptability** | Seamlessly context-switch between low-level Rust kernel-adjacent code (`/dev/uinput`), containerized distributed microservices, regional Fortune 500 governance, and bilingual stakeholder advisory. |
| **Communication** | Authored bilingual (EN/VI) READMEs, architecture topology models, and risk decision documents across every major project; experienced in presenting contentious trade-offs to senior leadership. |
| **Accountability** | Public commit history, auditable issue tracking, open-source licensing compliance (GPL-3.0 / MIT), and self-imposed 90-day audit retention policies. |

---

## 📋 ATS Keyword Reference
*(Naturally present throughout this CV)*

security risk · threat modelling · security controls · countermeasures · compensating controls · DRM · watermarking · 2FA/TOTP · Argon2id · Ed25519 · directory traversal · sandboxing · rate limiting · CORS · supply chain integrity · audit & assurance · risk appetite · security architecture · governance · secure SDLC · incident attribution · GnuPG · least privilege · non-normative flows · reverse proxy · Zero-Trust · Cloudflare Tunnels · Btrfs snapshot · ISO 27001 · CISSP
