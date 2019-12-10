UI.AddDropdown( "Custom clantag", [ "Disabled", "Fakehead animated v1", "Fakehead animated v2", "Fakehead static" ]  );
var lasttime = 0;
function onRender( )
{
    var tag = UI.GetValue( "Script Items", "Custom ClanTag" );
    var speed = 2;
    var time = parseInt((Globals.Curtime() * speed))
    if (time != lasttime)
    {
        if (tag = 1) { Local.SetClanTag(""); }
        if (tag = 2) {
            switch((time) % 32)
            {
            case 0: { Local.SetClanTag("                  "); break; }
            case 1: { Local.SetClanTag("$                 "); break; }
            case 2: { Local.SetClanTag(" $                "); break; }
            case 3: { Local.SetClanTag("d $               "); break; }
            case 4: { Local.SetClanTag("ad $              "); break; }
            case 5: { Local.SetClanTag("ead $             "); break; }
            case 6: { Local.SetClanTag("head $            "); break; }
            case 7: { Local.SetClanTag("ehead $           "); break; }
            case 8: { Local.SetClanTag("kehead $          "); break; }
            case 9: { Local.SetClanTag("akehead $         "); break; }
            case 10:{ Local.SetClanTag("fakehead $        "); break; }
            case 11:{ Local.SetClanTag(" fakehead $       "); break; }
            case 12:{ Local.SetClanTag("$ fakehead $      "); break; }
            case 13:{ Local.SetClanTag(" $ fakehead $     "); break; }
            case 14:{ Local.SetClanTag("  $ fakehead $    "); break; }
            case 15:{ Local.SetClanTag("   $ fakehead $   "); break; }
            case 16:{ Local.SetClanTag("    $ fakehead $  "); break; }
            case 17:{ Local.SetClanTag("     $ fakehead $ "); break; }
            case 18:{ Local.SetClanTag("      $ fakehead $"); break; }
            case 19:{ Local.SetClanTag("       $ fakehead "); break; }
            case 20:{ Local.SetClanTag("        $ fakehead"); break; }
            case 22:{ Local.SetClanTag("         $ fakehea"); break; }
            case 23:{ Local.SetClanTag("          $ fakehe"); break; }
            case 24:{ Local.SetClanTag("           $ fakeh"); break; }
            case 25:{ Local.SetClanTag("            $ fake"); break; }
            case 26:{ Local.SetClanTag("             $ fak"); break; }
            case 27:{ Local.SetClanTag("              $ fa"); break; }
            case 28:{ Local.SetClanTag("               $ f"); break; }
            case 29:{ Local.SetClanTag("                $ "); break; }
            case 30:{ Local.SetClanTag("                 $"); break; }
            case 31:{ Local.SetClanTag("                  "); break; }
            }
        }
        
        else if (tag = 3) {
            switch((time) % 25)
            {
            case 0: { Local.SetClanTag(""); break; }
            case 1: { Local.SetClanTag("$"); break; }
            case 2: { Local.SetClanTag("$"); break; }
            case 3: { Local.SetClanTag("$ f"); break; }
            case 4: { Local.SetClanTag("$ fa"); break; }
            case 5: { Local.SetClanTag("$ fak"); break; }
            case 6: { Local.SetClanTag("$ fake"); break; }
            case 7: { Local.SetClanTag("$ fakeh"); break; }
            case 8: { Local.SetClanTag("$ fakehe"); break; }
            case 9: { Local.SetClanTag("$ fakehea"); break; }
            case 10:{ Local.SetClanTag("$ fakehead"); break; }
            case 11:{ Local.SetClanTag("$ fakehead "); break; }
            case 12:{ Local.SetClanTag("$ fakehead $"); break; }
            case 13:{ Local.SetClanTag("$ fakehead "); break; }
            case 14:{ Local.SetClanTag("$ fakehead"); break; }
            case 15:{ Local.SetClanTag("$ fakehea"); break; }
            case 16:{ Local.SetClanTag("$ fakehe"); break; }
            case 17:{ Local.SetClanTag("$ fakeh"); break; }
            case 18:{ Local.SetClanTag("$ fake"); break; }
            case 19:{ Local.SetClanTag("$ fak"); break; }
            case 20:{ Local.SetClanTag("$ fa"); break; }
            case 21:{ Local.SetClanTag("$ f"); break; }
            case 22:{ Local.SetClanTag("$ "); break; }
            case 23:{ Local.SetClanTag("$"); break; }
            case 24:{ Local.SetClanTag(""); break; }
            }
        }
        
        else if (tag = 4) {
          Local.SetClanTag("$ fakehead $");
        }
    }
    lasttime = time;
}
Cheat.RegisterCallback("Draw", "onRender");
