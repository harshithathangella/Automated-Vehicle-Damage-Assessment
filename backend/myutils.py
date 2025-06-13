# backend/myutils.py

def get_description_and_cost(label):
    damage_info = {
        "minor_dent": (
            "Minor dent detected: typically small and shallow, repairable via paintless dent repair.",
            150
        ),
        "major_dent": (
            "Major dent detected: large dent likely requiring filling and repainting.",
            500
        ),
        "scratch": (
            "Scratch detected: superficial paint damage, repair cost depends on depth and location.",
            200
        ),
        "broken": (
            "Broken part detected: severe damage, replacement needed for structural or functional integrity.",
            800
        )
    }
    return damage_info.get(label, ("Unknown damage type. Manual inspection recommended.", 0))
