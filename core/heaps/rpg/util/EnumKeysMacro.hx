package heaps.rpg.util;

import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Type;

class EnumKeysMacro
{
public static macro function build( ) : ComplexType
{
	final pos = Context.currentPos();
	final t   = Context.getLocalType();
	switch (Context.getLocalType()) {
		case TInst(_, [t1]): {
			switch (t1)
			{
				case TEnum(e, _):
					final src       = e.get();
					final newName   = "EnumKeys__" + src.name;
					final newPack   = src.pack;
					final newPath   : TypePath = { pack : newPack, name : newName, params : [] };
					try Context.resolveType( TPath(newPath), pos )
					catch( _ )
					{
						final fields :Array<Field> = [
							for (c in src.constructs.keys())
								{
									name   : c,
									doc: null,
									meta: [],
									access: [],
									kind: FVar(null, null),
									pos: Context.currentPos()
								}
						];
		
						final def : TypeDefinition = {
							kind    : TDEnum,
							name    : newName,
							pack    : newPack,
							pos     : pos,
							params  : [],
							meta    : [],
							fields  : fields
						};
		
						Context.defineType(def);
					}
					
					return TPath(newPath);
		
				default:
					Context.error("EnumKeys can only be used with enum types", pos);
					return null;
			}
		}
		case t:
			Context.error("Class expected", Context.currentPos());
		}
		return null;
	}

}