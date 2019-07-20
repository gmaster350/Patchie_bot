class Spell {
    constructor() {

    }

    cast() {

    }

    castAt() {

    }
}

Spell.allSpells = {
    "Abi-Dalzim’s Horrid Wilting": {
        "level": 8,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Absorb Elements": {
        "level": 1,
        "school": "Abjuration",
        "castingTIme": "Special",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Acid Splash": {
        "level": 0,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Aganazzar’s Scorcher": {
        "level": 2,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Aid": {
        "level": 2,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Alarm (Ritual)": {
        "level": 1,
        "school": "Abjuration",
        "castingTIme": "1 Minute",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Alter Self": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Animal Friendship": {
        "level": 1,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Animal Messenger (Ritual)": {
        "level": 2,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Animal Shapes": {
        "level": 8,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Animate Dead": {
        "level": 3,
        "school": "Necromancy",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Animate Objects": {
        "level": 5,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Antilife Shell": {
        "level": 5,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Antimagic Field": {
        "level": 8,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Antipathy/Sympathy": {
        "level": 8,
        "school": "Enchantment",
        "castingTIme": "1 Hour",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Arcane Eye": {
        "level": 4,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Arcane Gate": {
        "level": 6,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Arcane Lock": {
        "level": 2,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Armor of Agathys": {
        "level": 1,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Arms of Hadar": {
        "level": 1,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Astral Projection": {
        "level": 9,
        "school": "Necromancy",
        "castingTIme": "1 Hour",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Augury (Ritual)": {
        "level": 2,
        "school": "Divination",
        "castingTIme": "1 Minute",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Aura of Life": {
        "level": 4,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Aura of Purity": {
        "level": 4,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Aura of Vitality": {
        "level": 3,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Awaken": {
        "level": 5,
        "school": "Transmutation",
        "castingTIme": "8 Hours",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Bane": {
        "level": 1,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Banishing Smite": {
        "level": 5,
        "school": "Abjuration",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Banishment": {
        "level": 4,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Barkskin": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Beacon of Hope": {
        "level": 3,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Beast Bond": {
        "level": 1,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Beast Sense (Ritual)": {
        "level": 2,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": true
    },
    "Bestow Curse": {
        "level": 3,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Bigby’s Hand": {
        "level": 5,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Blade Barrier": {
        "level": 6,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Blade Ward": {
        "level": 0,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Bless": {
        "level": 1,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Blight": {
        "level": 4,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Blinding Smite": {
        "level": 3,
        "school": "Evocation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Blindness/Deafness": {
        "level": 2,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Blink": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Blur": {
        "level": 2,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Bones of the Earth": {
        "level": 6,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Booming Blade": {
        "level": 0,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Branding Smite": {
        "level": 2,
        "school": "Evocation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Burning Hands": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Call Lightning": {
        "level": 3,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Calm Emotions": {
        "level": 2,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Catapult": {
        "level": 1,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Catnap": {
        "level": 3,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Cause Fear": {
        "level": 1,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Ceremony (Ritual)": {
        "level": 1,
        "school": "Abjuration",
        "castingTIme": "1 Hour",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Chain Lightning": {
        "level": 6,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Chaos Bolt": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Charm Monster": {
        "level": 4,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Charm Person": {
        "level": 1,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Chill Touch": {
        "level": 0,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Chromatic Orb": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Circle of Death": {
        "level": 6,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Circle of Power": {
        "level": 5,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Clairvoyance": {
        "level": 3,
        "school": "Divination",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": true
    },
    "Clone": {
        "level": 8,
        "school": "Necromancy",
        "castingTIme": "1 Hour",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Cloud of Daggers": {
        "level": 2,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Cloudkill": {
        "level": 5,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Color Spray": {
        "level": 1,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Command": {
        "level": 1,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Commune (Ritual)": {
        "level": 5,
        "school": "Divination",
        "castingTIme": "1 Minute",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Commune with Nature (Ritual)": {
        "level": 5,
        "school": "Divination",
        "castingTIme": "1 Minute",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Compelled Duel": {
        "level": 1,
        "school": "Enchantment",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Comprehend Languages (Ritual)": {
        "level": 1,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Compulsion": {
        "level": 4,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Cone of Cold": {
        "level": 5,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Confusion": {
        "level": 4,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Conjure Animals": {
        "level": 3,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Conjure Barrage": {
        "level": 3,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Conjure Celestial": {
        "level": 7,
        "school": "Conjuration",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": true
    },
    "Conjure Elemental": {
        "level": 5,
        "school": "Conjuration",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": true
    },
    "Conjure Fey": {
        "level": 6,
        "school": "Conjuration",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": true
    },
    "Conjure Minor Elementals": {
        "level": 4,
        "school": "Conjuration",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": true
    },
    "Conjure Volley": {
        "level": 5,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Conjure Woodland Beings": {
        "level": 4,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Contact Other Plane (Ritual)": {
        "level": 5,
        "school": "Divination",
        "castingTIme": "1 Minute",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Contagion": {
        "level": 5,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Contingency": {
        "level": 6,
        "school": "Evocation",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Continual Flame": {
        "level": 2,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Control Flames": {
        "level": 0,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Control Water": {
        "level": 4,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Control Weather": {
        "level": 8,
        "school": "Transmutation",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": true
    },
    "Control Winds": {
        "level": 5,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Cordon of Arrows": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Counterspell": {
        "level": 3,
        "school": "Abjuration",
        "castingTIme": "Special",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Create Bonfire": {
        "level": 0,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Create Food and Water": {
        "level": 3,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Create Homunculus": {
        "level": 6,
        "school": "Transmutation",
        "castingTIme": "1 Hour",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Create or Destroy Water": {
        "level": 1,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Create Undead": {
        "level": 6,
        "school": "Necromancy",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Creation": {
        "level": 5,
        "school": "Illusion",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Crown of Madness": {
        "level": 2,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Crown of Stars": {
        "level": 7,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Crusader’s Mantle": {
        "level": 3,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Cure Wounds": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Dancing Lights": {
        "level": 0,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Danse Macabre": {
        "level": 5,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Darkness": {
        "level": 2,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Darkvision": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Dawn": {
        "level": 5,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Daylight": {
        "level": 3,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Death Ward": {
        "level": 4,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Delayed Blast Fireball": {
        "level": 7,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Demiplane": {
        "level": 8,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Destructive Wave": {
        "level": 5,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Detect Evil and Good": {
        "level": 1,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Detect Magic (Ritual)": {
        "level": 1,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": true
    },
    "Detect Poison and Disease": {
        "level": 1,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": true
    },
    "Detect Thoughts": {
        "level": 2,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Dimension Door": {
        "level": 4,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Disguise Self": {
        "level": 1,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Disintegrate": {
        "level": 6,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Dispel Evil and Good": {
        "level": 5,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Dispel Magic": {
        "level": 3,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Dissonant Whispers": {
        "level": 1,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Divination (Ritual)": {
        "level": 4,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Divine Favor": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Divine Word": {
        "level": 7,
        "school": "Evocation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Dominate Beast": {
        "level": 4,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Dominate Monster": {
        "level": 8,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Dominate Person": {
        "level": 5,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Dragon's Breath": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Drawmij’s Instant Summons (Ritual)": {
        "level": 6,
        "school": "Conjuration",
        "castingTIme": "1 Minute",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Dream": {
        "level": 5,
        "school": "Illusion",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Druid Grove": {
        "level": 6,
        "school": "Abjuration",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Druidcraft": {
        "level": 0,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Dust Devil": {
        "level": 2,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Earth Tremor": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Earthbind": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Earthquake": {
        "level": 8,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Eldritch Blast": {
        "level": 0,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Elemental Bane": {
        "level": 4,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Elemental Weapon": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Enemies abound": {
        "level": 3,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Enervation": {
        "level": 5,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Enhance Ability": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Enlarge/Reduce": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Ensnaring Strike": {
        "level": 1,
        "school": "Conjuration",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Entangle": {
        "level": 1,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Enthrall": {
        "level": 2,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Erupting Earth": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Etherealness": {
        "level": 7,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Evard’s Black Tentacles": {
        "level": 4,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Expeditious Retreat": {
        "level": 1,
        "school": "Transmutation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Eyebite": {
        "level": 6,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Fabricate": {
        "level": 4,
        "school": "Transmutation",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Faerie Fire": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "False Life": {
        "level": 1,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Far Step": {
        "level": 5,
        "school": "Conjuration",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Fear": {
        "level": 3,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Feather Fall": {
        "level": 1,
        "school": "Transmutation",
        "castingTIme": "Special",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Feeblemind": {
        "level": 8,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Feign Death (Ritual)": {
        "level": 3,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Find Familiar (Ritual)": {
        "level": 1,
        "school": "Conjuration",
        "castingTIme": "1 Hour",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Find Greater Steed": {
        "level": 4,
        "school": "Conjuration",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Find Steed": {
        "level": 2,
        "school": "Conjuration",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Find the Path": {
        "level": 6,
        "school": "Divination",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": true
    },
    "Find Traps": {
        "level": 2,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Finger of Death": {
        "level": 7,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Fire Bolt": {
        "level": 0,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Fire Shield": {
        "level": 4,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Fire Storm": {
        "level": 7,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Fireball": {
        "level": 3,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Flame Arrows": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Flame Blade": {
        "level": 2,
        "school": "Evocation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Flame Strike": {
        "level": 5,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Flaming Sphere": {
        "level": 2,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Flesh to Stone": {
        "level": 6,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Fly": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Fog Cloud": {
        "level": 1,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Forbiddance (Ritual)": {
        "level": 6,
        "school": "Abjuration",
        "castingTIme": "10 Minutes",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Forcecage": {
        "level": 7,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Foresight": {
        "level": 9,
        "school": "Divination",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Freedom of Movement": {
        "level": 4,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Friends": {
        "level": 0,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Frostbite": {
        "level": 0,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Gaseous Form": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Gate": {
        "level": 9,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Geas": {
        "level": 5,
        "school": "Enchantment",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Gentle Repose (Ritual)": {
        "level": 2,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Giant Insect": {
        "level": 4,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Glibness": {
        "level": 8,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Globe of Invulnerability": {
        "level": 6,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Glyph of Warding": {
        "level": 3,
        "school": "Abjuration",
        "castingTIme": "1 Hour",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Goodberry": {
        "level": 1,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Grasping Vine": {
        "level": 4,
        "school": "Conjuration",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Grease": {
        "level": 1,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Greater Invisibility": {
        "level": 4,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Greater Restoration": {
        "level": 5,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Green-Flame Blade": {
        "level": 0,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Guardian of Faith": {
        "level": 4,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Guardian of Nature": {
        "level": 4,
        "school": "Transmutation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Guards and Wards": {
        "level": 6,
        "school": "Abjuration",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Guidance": {
        "level": 0,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Guiding Bolt": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Gust": {
        "level": 0,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Gust of Wind": {
        "level": 2,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Hail of Thorns": {
        "level": 1,
        "school": "Conjuration",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Hallow": {
        "level": 5,
        "school": "Evocation",
        "castingTIme": "24 Hours",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Hallucinatory Terrain": {
        "level": 4,
        "school": "Illusion",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Harm": {
        "level": 6,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Haste": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Heal": {
        "level": 6,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Healing Spirit": {
        "level": 2,
        "school": "Conjuration",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Healing Word": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Heat Metal": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Hellish Rebuke": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "Special",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Heroes’ Feast": {
        "level": 6,
        "school": "Conjuration",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Heroism": {
        "level": 1,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Hex": {
        "level": 1,
        "school": "Enchantment",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Hold Monster": {
        "level": 5,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Hold Person": {
        "level": 2,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Holy Aura": {
        "level": 8,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Holy Weapon": {
        "level": 5,
        "school": "Evocation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Hunger of Hadar": {
        "level": 3,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Hunter’s Mark": {
        "level": 1,
        "school": "Divination",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Hypnotic Pattern": {
        "level": 3,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Ice Knife": {
        "level": 1,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Ice Storm": {
        "level": 4,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Identify (Ritual)": {
        "level": 1,
        "school": "Divination",
        "castingTIme": "1 Minute",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Illusory Dragon": {
        "level": 8,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Illusory Script (Ritual)": {
        "level": 1,
        "school": "Illusion",
        "castingTIme": "1 Minute",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Immolation": {
        "level": 5,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Imprisonment": {
        "level": 9,
        "school": "Abjuration",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Incendiary Cloud": {
        "level": 8,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Infernal Calling": {
        "level": 5,
        "school": "Conjuration",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": true
    },
    "Infestation": {
        "level": 0,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Inflict Wounds": {
        "level": 1,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Insect Plague": {
        "level": 5,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Investiture of Flame": {
        "level": 6,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Investiture of Ice": {
        "level": 6,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Investiture of Stone": {
        "level": 6,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Investiture of Wind": {
        "level": 6,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Invisibility": {
        "level": 2,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Invulnerability": {
        "level": 9,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Jump": {
        "level": 1,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Knock": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Legend Lore": {
        "level": 5,
        "school": "Divination",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Leomund’s Secret Chest": {
        "level": 4,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Leomund’s Tiny Hut (Ritual)": {
        "level": 3,
        "school": "Evocation",
        "castingTIme": "1 Minute",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Lesser Restoration": {
        "level": 2,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Levitate": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Life Transference": {
        "level": 3,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Light": {
        "level": 0,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Lightning Arrow": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Lightning Bolt": {
        "level": 3,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Lightning Lure": {
        "level": 0,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Locate Animals or Plants (Ritual)": {
        "level": 2,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Locate Creature": {
        "level": 4,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Locate Object": {
        "level": 2,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Longstrider": {
        "level": 1,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Maddening Darkness": {
        "level": 8,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Maelstrom": {
        "level": 5,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Mage Armor": {
        "level": 1,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Mage Hand": {
        "level": 0,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Magic Circle": {
        "level": 3,
        "school": "Abjuration",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Magic Jar": {
        "level": 6,
        "school": "Necromancy",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Magic Missile": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Magic Mouth (Ritual)": {
        "level": 2,
        "school": "Illusion",
        "castingTIme": "1 Minute",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Magic Stone": {
        "level": 0,
        "school": "Transmutation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Magic Weapon": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Major Image": {
        "level": 3,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Mass Cure Wounds": {
        "level": 5,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Mass Heal": {
        "level": 9,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Mass Healing Word": {
        "level": 3,
        "school": "Evocation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Mass Polymorph": {
        "level": 9,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Mass Suggestion": {
        "level": 6,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Maximilian’s Earthen Grasp": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Maze": {
        "level": 8,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Meld into Stone (Ritual)": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Melf’s Acid Arrow": {
        "level": 2,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Melf’s Minute Meteors": {
        "level": 3,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Mending": {
        "level": 0,
        "school": "Transmutation",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Mental Prison": {
        "level": 6,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Message": {
        "level": 0,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Meteor Swarm": {
        "level": 9,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Mighty Fortress": {
        "level": 8,
        "school": "Conjuration",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Mind Blank": {
        "level": 8,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Mind Spike": {
        "level": 2,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Minor Illusion": {
        "level": 0,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Mirage Arcane": {
        "level": 7,
        "school": "Illusion",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Mirror Image": {
        "level": 2,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Mislead": {
        "level": 5,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Misty Step": {
        "level": 2,
        "school": "Conjuration",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Modify Memory": {
        "level": 5,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Mold earth": {
        "level": 0,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Moonbeam": {
        "level": 2,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Mordenkainen’s Faithful Hound": {
        "level": 4,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Mordenkainen’s Magnificent Mansion": {
        "level": 7,
        "school": "Conjuration",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Mordenkainen’s Private Sanctum": {
        "level": 4,
        "school": "Abjuration",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Mordenkainen’s Sword": {
        "level": 7,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Move Earth": {
        "level": 6,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Negative Energy Flood": {
        "level": 5,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Nondetection": {
        "level": 3,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Nystul’s Magic Aura": {
        "level": 2,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Otiluke’s Freezing Sphere": {
        "level": 6,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Otiluke’s Resilient Sphere": {
        "level": 4,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Otto’s Irresistible Dance": {
        "level": 6,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Pass Without Trace": {
        "level": 2,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Passwall": {
        "level": 5,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Phantasmal Force": {
        "level": 2,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Phantasmal Killer": {
        "level": 4,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Phantom Steed (Ritual)": {
        "level": 3,
        "school": "Illusion",
        "castingTIme": "1 Minute",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Planar Ally": {
        "level": 6,
        "school": "Conjuration",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Planar Binding": {
        "level": 5,
        "school": "Abjuration",
        "castingTIme": "1 Hour",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Plane Shift": {
        "level": 7,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Plant Growth": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "Special",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Poison Spray": {
        "level": 0,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Polymorph": {
        "level": 4,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Power Word Heal": {
        "level": 9,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Power Word Kill": {
        "level": 9,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Power Word Pain": {
        "level": 7,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Power Word Stun": {
        "level": 8,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Prayer of Healing": {
        "level": 2,
        "school": "Evocation",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Prestidigitation": {
        "level": 0,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Primal Savagery": {
        "level": 0,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Primordial Ward": {
        "level": 6,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Primordial Ward": {
        "level": 6,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Prismatic Spray": {
        "level": 7,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Prismatic Wall": {
        "level": 9,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Produce Flame": {
        "level": 0,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Programmed Illusion": {
        "level": 6,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Project Image": {
        "level": 7,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Protection from Energy": {
        "level": 3,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Protection from Evil and Good": {
        "level": 1,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Protection from Poison": {
        "level": 2,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Psychic Scream": {
        "level": 9,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Purify Food and Drink (Ritual)": {
        "level": 1,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Pyrotechnics": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Raise Dead": {
        "level": 5,
        "school": "Necromancy",
        "castingTIme": "1 Hour",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Rary’s Telepathic Bond (Ritual)": {
        "level": 5,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Ray of Enfeeblement": {
        "level": 2,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Ray of Frost": {
        "level": 0,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Ray of Sickness": {
        "level": 1,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Regenerate": {
        "level": 7,
        "school": "Transmutation",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Reincarnate": {
        "level": 5,
        "school": "Transmutation",
        "castingTIme": "1 Hour",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Remove Curse": {
        "level": 3,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Resistance": {
        "level": 0,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Resurrection": {
        "level": 7,
        "school": "Necromancy",
        "castingTIme": "1 Hour",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Reverse Gravity": {
        "level": 7,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Revivify": {
        "level": 3,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Rope Trick": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Sacred Flame": {
        "level": 0,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Sanctuary": {
        "level": 1,
        "school": "Abjuration",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Scatter": {
        "level": 6,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Scorching Ray": {
        "level": 2,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Scrying": {
        "level": 5,
        "school": "Divination",
        "castingTIme": "10 Minutes",
        "ritual": false,
        "concentration": true
    },
    "Searing Smite": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "See invisibility": {
        "level": 2,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Seeming": {
        "level": 5,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Sending": {
        "level": 3,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Sequester": {
        "level": 7,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Shadow Blade": {
        "level": 2,
        "school": "Illusion",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Shadow of Moil": {
        "level": 4,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Shape Water": {
        "level": 0,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Shapechange": {
        "level": 9,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Shatter": {
        "level": 2,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Shield": {
        "level": 1,
        "school": "Abjuration",
        "castingTIme": "Special",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Shield of Faith": {
        "level": 1,
        "school": "Abjuration",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Shillelagh": {
        "level": 0,
        "school": "Transmutation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Shocking Grasp": {
        "level": 0,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Sickening Radiance": {
        "level": 4,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Silence (Ritual)": {
        "level": 2,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": true
    },
    "Silent Image": {
        "level": 1,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Simulacrum": {
        "level": 7,
        "school": "Illusion",
        "castingTIme": "12 Hours",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Skill Empowerment": {
        "level": 5,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Skywrite (Ritual)": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": true
    },
    "Sleep": {
        "level": 1,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Sleet Storm": {
        "level": 3,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Slow": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Snare": {
        "level": 1,
        "school": "Abjuration",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Snilloc’s Snowball Swarm": {
        "level": 2,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Soul Cage": {
        "level": 6,
        "school": "Necromancy",
        "castingTIme": "Special",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Spare the Dying": {
        "level": 0,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Speak with Animals (Ritual)": {
        "level": 1,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Speak with Dead": {
        "level": 3,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Speak with Plants": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Spider Climb": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Spike Growth": {
        "level": 2,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Spirit Guardians": {
        "level": 3,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Spiritual Weapon": {
        "level": 2,
        "school": "Evocation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Staggering Smite": {
        "level": 4,
        "school": "Evocation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Steel Wind Strike": {
        "level": 5,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Stinking Cloud": {
        "level": 3,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Stone Shape": {
        "level": 4,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Stoneskin": {
        "level": 4,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Storm of Vengeance": {
        "level": 9,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Storm Sphere": {
        "level": 4,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Suggestion": {
        "level": 2,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Summon Greater Demon": {
        "level": 4,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Summon Lesser Demons": {
        "level": 3,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Sunbeam": {
        "level": 6,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Sunburst": {
        "level": 8,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Swift Quiver": {
        "level": 5,
        "school": "Transmutation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Sword Burst": {
        "level": 0,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Symbol": {
        "level": 7,
        "school": "Abjuration",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Synaptic Static": {
        "level": 5,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Tasha’s Hideous Laughter": {
        "level": 1,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Telekinesis": {
        "level": 5,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Telepathy": {
        "level": 8,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Teleport": {
        "level": 7,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Teleportation Circle": {
        "level": 5,
        "school": "Conjuration",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Temple of the Gods": {
        "level": 7,
        "school": "Conjuration",
        "castingTIme": "1 Hour",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Tenser’s Floating Disk (Ritual)": {
        "level": 1,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Tenser’s Transformation": {
        "level": 6,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Thaumaturgy": {
        "level": 0,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Thorn Whip": {
        "level": 0,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Thunder Step": {
        "level": 3,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Thunderclap": {
        "level": 0,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Thunderous Smite": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Thunderwave": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Tidal Wave": {
        "level": 3,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Time Stop": {
        "level": 9,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Tiny Servant": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Toll the Dead": {
        "level": 0,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Tongues": {
        "level": 3,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Transmute Rock": {
        "level": 5,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Transport via Plants": {
        "level": 6,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Trap the Soul": {
        "level": 8,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Tree Stride": {
        "level": 5,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "True Polymorph": {
        "level": 9,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "True Resurrection": {
        "level": 9,
        "school": "Necromancy",
        "castingTIme": "1 Hour",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "True Seeing": {
        "level": 6,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "True Strike": {
        "level": 0,
        "school": "Divination",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Tsunami": {
        "level": 8,
        "school": "Conjuration",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": true
    },
    "Unseen Servant (Ritual)": {
        "level": 1,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Vampiric Touch": {
        "level": 3,
        "school": "Necromancy",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Vicious Mockery": {
        "level": 0,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Vitriolic Sphere": {
        "level": 4,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Wall of Fire": {
        "level": 4,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Wall of Force": {
        "level": 5,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Wall of Ice": {
        "level": 6,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Wall of Light": {
        "level": 5,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Wall of Sand": {
        "level": 3,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Wall of Stone": {
        "level": 5,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Wall of Thorns": {
        "level": 6,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Wall of Water": {
        "level": 3,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Warding Bond": {
        "level": 2,
        "school": "Abjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Warding Wind": {
        "level": 2,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Water Breathing (Ritual)": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Water Walk (Ritual)": {
        "level": 3,
        "school": "Transmutation",
        "castingTIme": "1 Action",
        "ritual": true,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Watery Sphere": {
        "level": 4,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Web": {
        "level": 2,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Weird": {
        "level": 9,
        "school": "Illusion",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Whirlwind": {
        "level": 7,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Wind Walk": {
        "level": 6,
        "school": "Transmutation",
        "castingTIme": "1 Minute",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Wind Wall": {
        "level": 3,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Wish": {
        "level": 9,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Witch Bolt": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Word of Radiance": {
        "level": 0,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Word of Recall": {
        "level": 6,
        "school": "Conjuration",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },
    "Wrath of Nature": {
        "level": 5,
        "school": "Evocation",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": true
    },
    "Wrathful Smite": {
        "level": 1,
        "school": "Evocation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Zephyr Strike": {
        "level": 1,
        "school": "Transmutation",
        "castingTIme": "1 Bonus Action",
        "ritual": false,
        "concentration": true
    },
    "Zone of Truth": {
        "level": 2,
        "school": "Enchantment",
        "castingTIme": "1 Action",
        "ritual": false,
        "concentration": false,
        "action": function ( player, target ) {}
    },


};
