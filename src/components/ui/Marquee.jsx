import { motion } from 'framer-motion';

export default function Marquee({ items = [], separator = '·', speed = 30 }) {
  if (items.length === 0) return null;

  const row = (key) => (
    <div className="marquee-row" key={key} aria-hidden={key !== 'a'}>
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <span key={i} className="marquee-item">
          <span>{item}</span>
          <span className="marquee-sep">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" style={{ '--marquee-speed': `${speed}s` }}>
      {row('a')}
      {row('b')}
    </div>
  );
}
