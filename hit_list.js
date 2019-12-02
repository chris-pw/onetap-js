var logs = [];
var alphaH = 200;
var alphaB = 95;
var position = {
  x: 100,
  y: 100
}

var hitboxes = [
  'Generic',
  'Head',
  'Chest',
  'Stomach',
  'Left arm',
  'Right arm',
  'Left leg',
  'Right leg',
  'Body'
];    

const rainbow = [
  Math.floor(Math.sin(Global.Realtime() * 2) * 127 + 128),
  Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
  Math.floor(Math.sin(Global.Realtime() * 2 + 4) * 127 + 128),
  255
];

var damageColors = {
  lethal: rainbow, // Was 255, 0, 0, 255 
  semi:   [255, 140, 0, 255],
  half:   [255, 215, 0, 255],
  low:    [0, 255, 0, 255],
  miss:   [100, 149, 237, 255]
}
function getHitboxName(index) {
  return hitboxes[index] || 'Generic';
}

function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}
function getCustomValue(field) {
  var value = UI.GetValue("MISC", "JAVASCRIPT", "Script items", field);
  return value;
}
function cursorConstruct(array) {
  if (typeof array !== 'object') {
    return null;
  }
  return {
    x: array[0],
    y: array[1]
  };
}
function onObject(cursor, position, width, heigth) {
  if (!cursor || !position || !width || !heigth) {
    return;
  }
  return cursor.x <= position.x + width && cursor.x >= position.x
    && cursor.y <= position.y + heigth && cursor.y >= position.y;
}
function colorByDamage(damage) {
  if (damage > 90) {
    return damageColors.lethal
  } else if (damage < 90 && damage > 70) {
    return damageColors.semi
  } else if (damage < 70 && damage > 50) {
    return damageColors.half
  } else if (damage > 0) {
    return damageColors.low;
  } else {
    return damageColors.miss;
  }
}
function render() {
  var visible = getCustomValue('hitlist');
  UI.SetEnabled('Script Items', 'update every round', visible);
  UI.SetEnabled('Script Items', 'misc logs', visible);

  var customAlphaEnabled = getCustomValue('custom alpha');
  UI.SetEnabled('Script Items', 'alpha header', customAlphaEnabled);
  UI.SetEnabled('Script Items', 'alpha background', customAlphaEnabled);
  var customPositionEnabled = getCustomValue('position by pixels');
  UI.SetEnabled('Script Items', 'position x', customPositionEnabled);
  UI.SetEnabled('Script Items', 'position y', customPositionEnabled);

  if (!visible) {
    return;
  }
  tickcount = Global.Tickcount();
  position.x = getCustomValue('position x');
  position.y = getCustomValue('position y');
  alphaH = getCustomValue('alpha header');
  alphaB = getCustomValue('alpha background');
  if (UI.IsMenuOpen()) {
    var cursor = cursorConstruct(Global.GetCursorPosition());
    if (cursor && Global.IsKeyPressed(0x01)) {
      if (onObject(cursor, position, 260, 160)) {
        UI.SetValue('Script Items', 'position x', cursor.x - 260 / 2);
        UI.SetValue('Script Items', 'position y', cursor.y - 160 / 2);
      }
    }
  }
  color = HSVtoRGB(tickcount % 350 / 350, 1, 1, 1, 255);
  Render.FilledRect(position.x, position.y, 260, 20, [0, 0, 0, alphaH]);
  Render.FilledRect(position.x, position.y + 20, 260, 140, [0, 0, 0, alphaB]);
  Render.String(position.x + 5, position.y + 5, 0, "NAME", [255, 255, 255, 255], 8);
  Render.String(position.x + 110, position.y + 5, 0, "DMG", [255, 255, 255, 255], 8);
  Render.String(position.x + 150, position.y + 5, 0, "HITBOX", [255, 255, 255, 255], 8);
  Render.Line(position.x, position.y + 20, position.x + 259, position.y + 20, [color.r, color.g, color.b, 255]);
  for (var i = logs.slice(-7).length, j = 0; i > 0; i-- , j++) {
    // brain issue, sry
    if (j > 6) {
      j = 0;
    }
    var log = logs.slice(-7)[i - 1];
    if (!log.type) {
      Render.FilledRect(position.x + 3, position.y + 20 * (j + 1.25), 2, 10.5, colorByDamage(log.damage));
    }
    Render.String(position.x + 7, position.y + 20 * (j + 1.25), 0, log.name.slice(0, 14), [255, 255, 255, 255], 8);
    Render.String(position.x + 110, position.y + 20 * (j + 1.25), 0, String(log.damage), [255, 255, 255, 255], 8);
    Render.String(position.x + 150, position.y + 20 * (j + 1.25), 0, log.hitbox, [255, 255, 255, 255], 8);
  }
  if (logs.length > 7) {
    logs.shift();
  }
}
function onHit() {
  var me = Entity.GetLocalPlayer();
  var victim = Event.GetInt('userid');
  var attacker = Event.GetInt('attacker');
  var damage = Event.GetInt('dmg_health');
  var hitbox = Event.GetInt('hitgroup');
  var victimIndex = Entity.GetEntityFromUserID(victim);
  var attackerIndex = Entity.GetEntityFromUserID(attacker);
  var name = Entity.GetName(victimIndex);
  if (me == attackerIndex && me != victimIndex) {
    logs.push({
      name: name,
      hitbox: getHitboxName(hitbox),
      damage: damage
    });
  }
}
function roundStartListener() {
  if (!getCustomValue('update every round')) {
    return;
  }
  logs = [];
}
function roundEndListener() {
  if (getCustomValue('misc logs') != 1) {
    return;
  }
  logs.push({
    name: 'Round ended',
    hitbox: '',
    damage: '',
    type: 'roundEnd'
  });
}
function main() {
  var sizes = Global.GetScreenSize();
  // Main
  UI.AddCheckbox('hitlist');
  UI.AddCheckbox('update every round');
  // Misc logs
  UI.AddMultiDropdown('misc logs', [
    'round end'
  ]);
  UI.AddCheckbox('custom alpha');
  UI.AddSliderInt('alpha header', 0, 255);
  UI.AddSliderInt('alpha background', 0, 255);
  // Position
  UI.AddCheckbox('position by pixels');
  UI.AddSliderInt('position x', 0, sizes[0]);
  UI.AddSliderInt('position y', 0, sizes[1]);
  Global.RegisterCallback('Draw', 'render');
  Global.RegisterCallback('player_hurt', 'onHit');
  Global.RegisterCallback('weapon_fire', 'onShot');
  Global.RegisterCallback('round_start', 'roundStartListener');
  Global.RegisterCallback('round_end', 'roundEndListener');
}
main();
