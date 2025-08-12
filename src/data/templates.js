import {
  ClassicIcon,
  BackdropIcon,
  HighlightIcon,
  GlowIcon,
  MonoIcon,
  ElegantIcon,
  ComicIcon,
  MinimalIcon
} from '../components/icons';

// Default template structure
const defaultTemplate = {
  popularity: 80,
  useCases: ["General"],
  cssStyle: { color: '#000000' }
};

// Template definitions (id, name, icon, icon color, cost, tag, demoText)
const templateData = [
  [1, "Classic", ClassicIcon, "text-gray-600", 0, "Free", "This is Classic style"],
  [2, "Backdrop", BackdropIcon, "text-purple-600", 200, "Premium", "This is Backdrop style"],
  [3, "Highlight", HighlightIcon, "text-yellow-600", 300, "Popular", "This is Highlight style"],
  [4, "Glow", GlowIcon, "text-cyan-500 animate-pulse", 250, "New", "This is Glow style"],
  [5, "Mono", MonoIcon, "text-green-600", 100, "Editor's Choice", "This is Mono style"],
  [6, "Elegant", ElegantIcon, "text-rose-600", 180, "Luxury", "This is Elegant style"],
  [7, "Comic", ComicIcon, "text-pink-600", 150, "Fun", "This is Comic style"],
  [8, "Minimal", MinimalIcon, "text-blue-500", 50, "Minimal", "This is Minimal style"]
];

// Generate final templates array
const templates = templateData.map(([id, name, Icon, colorClass, cost, tag, demoText]) => ({
  ...defaultTemplate,
  id,
  name,
  Icon,
  iconClass: `${colorClass} w-6 h-6`,
  cost,
  tag,
  demoText
}));

export { templates };
export default templates;
