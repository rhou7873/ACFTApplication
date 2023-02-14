
import sys, fitz
import json, os

fname = 'public/ACFT_scoring_scales_220323.pdf'  # get document filename
doc = fitz.open(fname)  # open document
out = open(os.path.abspath("male.json"), "w")  # open text output
out2 = open(os.path.abspath("female.json"), "w")
events = ["deadlift", "standing_power_throw", "hand_release_push_up", "sprint_drag_carry", "plank", "two_mile_run"]
all_male = {events[i] : {17 + 5 * j : {} for j in range(10)} for i in range(6)}
all_female = {events[i] : {17 + 5 * j : {} for j in range(10)} for i in range(6)}
x = 0
for page in doc:
    text = page.get_text(sort='true')
    list = text.split('\n')
    list = " ".join(list)
    list = list.split('Points')[2].strip().split(' ')
    i = 0
    # create dict of dicts for each age group in each gender
    COLUMNS = 22
    male, female = all_male[events[x]], all_female[events[x]]
    if "CONTINUES" in list:
        list = list[:-4]
    else:
        x += 1
    while i < len(list): 
        row = list[i:i+22]
        score = row[0]
        for j in range(1, len(row) - 1, 2):
            age = 17 + 5 * (j // 2)
            if row[j] != "–--":
                male[age][row[j]] = row[0]
            if row[j + 1] != "---":
                female[age][row[j + 1]] = row[0]
        i += COLUMNS

    # output
json.dump(all_male, fp=out, indent=4) 
json.dump(all_female, fp=out2, indent=4)


print(all_male['sprint_drag_carry'][17]['01:39'])

