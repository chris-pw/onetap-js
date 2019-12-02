UI.AddCheckbox("Fake lag on nade fix");

function check() {
    if (UI.GetValue( "Misc", "JAVASCRIPT", "Script items", "Fake lag on nade fix")) {
        LagFix();
    }
}

function LagFix() {
    player = Entity.GetLocalPlayer();
    weapon = Entity.GetWeapon(player);
        weaponName = Entity.GetName(weapon);
    if (weaponName.includes("high explosive grenade") || (weaponName.includes("molotov") || (weaponName.includes("incendiary grenade") || (weaponName.includes("smoke grenade"))))) {
            UI.SetValue( "Anti-Aim", "Fake-Lag", "Enabled", false )
        }else {
            UI.SetValue( "Anti-Aim", "Fake-Lag", "Enabled", true )
    }
}

Global.RegisterCallback("Draw", "check");