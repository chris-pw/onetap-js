// FixesV1 Pasted By Pinecone
// Grenades From https://onetap.su/threads/release-disable-fake-lag-on-grenade.13047/
// R8 From https://onetap.su/threads/disable-fake-lag-on-r8.13063/
// Knife From https://onetap.su/threads/avoid-aa-on-knife.13028/

function check() {
    var enabled = true;
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Show Fixes")) {
        var enabled = false;
    }
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script items", "No FakeLag With Nades Out", enabled);
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script items", "No FakeLag With Revolver", enabled);
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script items", "No AA on knife fix", enabled);
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "No FakeLag With Nades Out") || GetValue("Misc", "JAVASCRIPT", "Script items", "No FakeLag With Revolver")) {
        LagFix();
    }
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "No AA on knife fix")) {
        knifeFix();
    }
}
function LagFix() {
    player = Entity.GetLocalPlayer();
    weapon = Entity.GetWeapon(player);
    weaponName = Entity.GetName(weapon);

    if ((weaponName.includes("high explosive grenade") || (weaponName.includes("molotov") || (weaponName.includes("incendiary grenade") || (weaponName.includes("smoke grenade"))))) || (UI.GetValue("MISC", "JAVASCRIPT", "Script items", "No FakeLag With Revolver") && weaponName.includes("revolver"))) {
        var FakeLagDisable = true;
    } else {
        var FakeLagDisable = false;
    }
    if (FakeLagDisable) {
        UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", false)
    } else {
        UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", true)
    }
}
function knifeFix() {
    player = Entity.GetLocalPlayer();
    weapon = Entity.GetWeapon(player);
    weaponName = Entity.GetName(weapon);
    if (weaponName.includes("knife")) {
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Enabled", false)
    } else {
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Enabled", true)
    }
}
function main(){
    UI.AddCheckbox("Show Fixes");
    UI.AddCheckbox("No FakeLag With Nades Out");
    UI.AddCheckbox("No FakeLag With Revolver");
    UI.AddCheckbox("No AA on knife fix");
    UI.SetValue("MISC", "JAVASCRIPT", "Script items", "Show Fixes", false);
    Global.RegisterCallback("Draw", "check");
}
main();
