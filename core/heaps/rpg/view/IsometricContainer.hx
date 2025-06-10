package heaps.rpg.view;

import h2d.RenderContext;

class IsometricContainer extends h2d.Object {
    var sortKey = null;
    var sortJ = null;
    override function drawContent(ctx: RenderContext) {
        
        
        for (i in 1...children.length) {
            sortKey = children[i];
            sortJ = i - 1;

            while (sortJ >= 0 && children[sortJ].y > sortKey.y) {
                children[sortJ + 1] = children[sortJ];
                sortJ--;
            }
            children[sortJ + 1] = sortKey;
        }
        super.drawContent(ctx);
    }
}