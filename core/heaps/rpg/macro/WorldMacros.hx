package heaps.rpg.macro;

import haxe.macro.ExprTools;
import haxe.macro.Expr;
import haxe.macro.Context;
import haxe.macro.Type;

class WorldMacros
    {
        
        public static macro function seekTag(callingExpr:ExprOf<RPGWorld>, typeExpr:Expr):Expr
        {
            var typePath        = getTypePath(typeExpr);         
            var classPathExpr   = macro $v{typePath};
            return classPathExpr;
        }

        public static macro function seek(callingExpr:ExprOf<RPGWorld>, typeExpr:Expr):Expr
            {
                
                
                
                var typePath        = getTypePath(typeExpr);          
                var classPathExpr   = macro $v{typePath};
        
                
                
                
                var tFinal = Context.follow(Context.getType(typePath));
        
                var initValue:Expr = switch (tFinal)
                {
                    
                    case TInst(_, _):
                        macro Type.createEmptyInstance($typeExpr);
        
                    
                    case TAnonymous(a):
                        var objFields:Array<ObjectField> = [];
                        for (f in a.get().fields)
                            if (!f.meta.has(":optional"))
                                objFields.push({ field : f.name, expr : getDefaultValue(f.type) });
                        { expr : EObjectDecl(objFields), pos : Context.currentPos() };
        
                    
                    default:
                        macro null;
                };
        
                
                
                
                var ct : haxe.macro.ComplexType = haxe.macro.TypeTools.toComplexType(Context.getType(typePath));
        
                var getExpr  = macro @:privateAccess $callingExpr._get($classPathExpr);
                var typedExpr:Expr = {
                    expr : ECheckType(getExpr, ct),                 
                    pos  : Context.currentPos()
                };
        
                
                
                
                var e = {
                    expr : EBlock([
                        macro @:privateAccess if (!$callingExpr._exists($classPathExpr)) {
                            $callingExpr._add($classPathExpr, $initValue);
                        },
                        typedExpr                                         
                    ]),
                    pos  : Context.currentPos()
                };

                
                return e;
            }
    
        
        
        
        private static function getTypePath(e:Expr):String
        {
            function loop(e:Expr):String
            {
                #if macro
                return switch (e.expr)
                {
                    case EConst(CIdent(s)): s;
                    case EField(sub, field): loop(sub) + "." + field;
                    default: Context.error("Expected a type path here", e.pos);
                }
                #end
                return null;
            }
            return loop(e);
        }
    
        
        
        
        private static function getDefaultValue(t:Type):Expr
        {   
            #if macro
            t = Context.follow(t);
            #end
            return switch (t)
            {
                
                case TAbstract(a, _):
                    switch (a.get().name)
                    {
                        case "Int":    macro 0;
                        case "Float":  macro 0.0;
                        case "Bool":   macro false;
                        default:       macro null;
                    }
    
                
                case TInst(c, _)
                    if (c.get().name == "String"):
                        macro "";
    
                
                default:
                    macro null;
            }
        }
}


