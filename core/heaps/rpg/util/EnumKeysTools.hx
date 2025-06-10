package heaps.rpg.util;

import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Type;

class EnumKeysTools {

    public static macro function matches (e : Expr, value : Expr) : Expr
    {
        final pos   = Context.currentPos();


        final vType = Context.typeof(value);

        var enumT   : EnumType;
        switch (vType)
        {
        case TEnum(e, _): enumT = e.get();
        default:
        Context.error("Second argument of matches() " +
        "has to be an enum value", value.pos);
        }


        final ekName      = "EnumKeys__" + enumT.name;
        final ekFullName  = (enumT.pack.length > 0 ? enumT.pack.join(".") + "." : "")
        + ekName;

        final cases = [];

        for (ctorName in enumT.constructs.keys())
        {
        final ctorField = enumT.constructs[ctorName];

        var paramCount = 0;
        switch (ctorField.type)
        {
            case TFun(args, _): paramCount = args.length;
            default:            paramCount = 0;
        }

        var pattern : Expr;
        {
            final ctorIdent : Expr =
                { expr : EConst(CIdent(ctorName)), pos : pos };

            if (paramCount == 0)
                pattern = ctorIdent;
            else {
                final und = macro _;
                final params = [ for (_ in 0...paramCount) und ];
                pattern =
                    { expr : ECall(ctorIdent, params), pos : pos };
            }
        }

        final rhsEnum  = Context.parse(ekFullName, pos);
        final rhsExpr  = { expr : EField(rhsEnum, ctorName), pos : pos };
        final bodyExpr = { expr : EBinop(OpEq, e, rhsExpr), pos : pos };

        cases.push({
            values : [ pattern ],
            guard  : null,
            expr   : bodyExpr
        });
        }

        final defaultExpr : Expr = macro false;

        return {
            expr : ESwitch(value, cases, defaultExpr),
            pos  : pos
        };
    }
}

