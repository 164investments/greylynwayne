import type { BlogPost } from "./blog/_schema";

// Posts are authored as JSON in ./blog/<slug>.json and registered here.
// Order = newest/most important first (drives the /blog index order).
import costToStage from "./blog/cost-to-stage-a-home-portland.json";
import interiorDesignerCost from "./blog/interior-designer-cost-portland.json";
import isStagingWorthIt from "./blog/is-home-staging-worth-it.json";
import howToStage from "./blog/how-to-stage-your-house-to-sell.json";
import trends2026 from "./blog/interior-design-trends-2026.json";
import sageGreen from "./blog/sage-green-interior-design.json";
import stagingTips from "./blog/home-staging-tips.json";
import stagingChecklist from "./blog/home-staging-checklist.json";
import decorateLivingRoom from "./blog/how-to-decorate-a-living-room.json";
import smallSpace from "./blog/small-space-design-ideas.json";
import occupiedHome from "./blog/staging-an-occupied-home.json";

export const blogPosts: BlogPost[] = [
  costToStage,
  interiorDesignerCost,
  isStagingWorthIt,
  howToStage,
  trends2026,
  sageGreen,
  stagingTips,
  stagingChecklist,
  decorateLivingRoom,
  smallSpace,
  occupiedHome,
] as BlogPost[];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
