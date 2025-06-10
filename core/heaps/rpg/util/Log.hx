package heaps.rpg.util;

import haxe.macro.Expr;
import haxe.macro.Context;
import haxe.macro.Expr.ExprOf;

class Log {
    public static macro function trace(e:ExprOf<String>): Expr {
        #if debug_logging
        var loc = haxe.macro.PositionTools.toLocation(Context.currentPos());

        var fileName = haxe.macro.Context.getPosInfos(haxe.macro.Context.currentPos()).file;
        var lineNumber = loc.range.start.line;
        var className = Context.getLocalClass().get().name.split(".").pop();
        var methodName = Context.getLocalMethod();

        var traceOptionsExpr = macro {
            fileName: $v{fileName}, 
            lineNumber: $v{lineNumber},
            className: $v{className},
            methodName: $v{methodName}
        };
        
        var baseTraceArgsExpr = macro haxe.Log.trace("test", {});
        
        switch(baseTraceArgsExpr.expr){
            case ECall(_, args): {
                args[0].expr = e.expr;
                args[1].expr = traceOptionsExpr.expr;
                baseTraceArgsExpr.pos = Context.currentPos();
                return baseTraceArgsExpr;
            }
            case _:
                return macro haxe.Log.trace($e, $traceOptionsExpr);
        }
        
        #else
        return macro null;
        #end
    }
}