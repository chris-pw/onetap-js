/**
 *
 * Title: Old spectators list
 * Author: april#0001
 * Description: Recreates the V1's spectators list
 *
*/

//region menu
// Backups our positions
UI.SetValue( "Misc", "PERFORMANCE & INFORMATION", "Information", "Watermark", false );
const watermark_x = UI.AddSliderInt("watermark_x", 0, Global.GetScreenSize()[0])
const watermark_y = UI.AddSliderInt("watermark_y", 0, Global.GetScreenSize()[1])
//endregion

//region functions

/**
 * Updates the visibility of our menu elements
 */
function update_menu()
{
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "watermark_x", false)
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "watermark_y", false)
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "watermark_x1", false)
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "watermark_y1", false)
}

// Update it whenever the script is activated.
update_menu();

/**
 * Gets the names of the players spectating you
 *
 * @returns {[]}
 */
function get_spectators()
{
    var specs = [];
    const players = Entity.GetPlayers();

    for (i = 0; i < players.length; i++)
    {
        const cur = players[i];

        if (Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget") != "m_hObserverTarget") {
            const obs = Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget")

            if (obs === Entity.GetLocalPlayer())
            {
                const name = Entity.GetName(cur);
                specs.push(name);
            }
        }
    }

    return specs;
}

/**
 * Checks if a point is inside a perimeter
 *
 * @param vec
 * @param x
 * @param y
 * @param x2
 * @param y2
 * @returns {boolean}
 */
function in_bounds(vec, x, y, x2, y2)
{
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

/**
 * Where the magic happens
 */
function main()
{
  var watermark_name = Entity.GetName(Entity.GetLocalPlayer( ));
  var ping1 = Global.Latency() * 1000 / 1.5
  var ping = Math.floor(ping1)
  var fps1 = 1 / Global.Frametime()
  var fps = Math.floor(fps1)

    // Get our drawing properties
    const names = get_spectators();
    const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_x"),
            y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_y");
    const x1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_x1"),
            y1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_y1");

    // Rainbow color for our bar
    const rainbow = [
        Math.floor(Math.sin(Global.Realtime() * 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 4) * 127 + 128),
        255
    ];

    // Draw the spectators list
    Render.Rect(x + 1574, y + 9, 202, 61 + 15 * (names.length - 1), [2, 2, 2, 100]);
    Render.FilledRect(x + 1575, y + 10, 200, 60 + 15 * (names.length - 1), [55, 55, 55, 200]);
    Render.Rect(x + 1580, y + 15, 190, 50 + 15 * (names.length - 1), [2, 2, 2, 100]);
    Render.FilledRect(x + 1580, y + 15, 190, 50 + 15 * (names.length - 1), [25, 25, 25, 200]);
    Render.FilledRect(x + 1580, y + 15, 190, 3, rainbow);
    Render.String(x + 1588, y + 30, 0, "onetap.su" + "   |   " + watermark_name + "   |   " + "ping: " + ping + "   |   " + "fps: " + fps, [255, 255, 255, 200], 3);


    Render.Rect(x1 + 1799, y1 + 9, 102, 61 + 15 * (names.length - 1), [2, 2, 2, 100]);
    Render.FilledRect(x1 + 1800, y1 + 10, 100, 60 + 15 * (names.length - 1), [55, 55, 55, 200]);
    Render.Rect(x1 + 1805, y1+ 15, 90, 50 + 15 * (names.length - 1), [2, 2, 2, 100]);
    Render.FilledRect(x1 + 1805, y1 + 15, 90, 50 + 15 * (names.length - 1), [25, 25, 25, 200]);
    Render.FilledRect(x1 + 1805, y1 + 15, 90, 3, rainbow);
    Render.String(x1 + 1850, y1 + 15, 1, "OT", rainbow, 4);

}
//endregion

//region callbacks

// Callback our main function
Global.RegisterCallback("Draw", "main")

//endregion
