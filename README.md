# OpportunityKit

**Search an opportunity. Check if you are ready. Know exactly what to fix.**

SETU 2026 (Forge Realm), Round 2 prototype for **PS-03: OpportunityKit**. Team Spark.

**Live demo:** https://opportunitykit-beta.vercel.app

> Demo note: every opportunity in this prototype is **sample data made up for the demo**. None of it is verified. Always confirm the rules on the official source before applying.

## The problem

Internships, scholarships and competitions list their requirements in different places and formats. Students cannot easily tell if they qualify or what to prepare.

## What it does

1. **Save your details** once: year, branch, CGPA, skills, documents and more. Edit them any time. They stay on your device.
2. **Search** for what you want, for example `css competition` or `python internship`. Filter by type, hide closed ones, sort by deadline or best match.
3. **See your match on every card**: Match, Mismatch and Missing counts.
4. **Open the checker** for one opportunity. Every requirement gets a status and a plain reason.
5. **Follow the Gap-to-Action Roadmap**: a tick-off list of what to fix or add before applying.

## Key features

- One checklist format for internships, scholarships and competitions
- Three explainable statuses: **Match**, **Mismatch**, **Missing info**
- Missing information is never treated as a failure. The app asks for it instead.
- Clear summary and next steps, not just "eligible: yes/no"
- **Add your own opportunity**: type in any requirements and get the same checklist
- 15 sample opportunities (internships, scholarships, competitions), clearly labelled as sample data
- Input checks with helpful error messages, for example a CGPA above 10 is rejected
- **Premium demo preview**: save opportunities and see a deadline reminder list
- Works on phone and laptop

## How the checking works

The checker uses visible rules, not a hidden AI answer.

| Requirement | Rule |
|---|---|
| Year of study | Must fall within the allowed years |
| CGPA / marks % | Must be at or above the minimum |
| Family income | Must be at or below the limit |
| Skills | Every required skill must be listed |
| Documents | Must be marked Ready |
| Portfolio / GitHub | A link must be provided |
| Availability | Free weeks must be at least the weeks needed |
| Team size | Must fall within the allowed range |
| Deadline | Must not have passed |

If your details do not answer a requirement, it shows **Missing info** and tells you what to add.

## Plans and monetization (proposal, not validated)

| Plan | Who pays | What it includes |
|---|---|---|
| Free | Nobody | Search, checker, roadmap, add your own opportunity |
| Student Premium (proposed 99 rupees per month) | The student | Saved opportunities and a deadline reminder list (demo works). Email and phone alerts (planned) |
| College plan (to be validated) | College placement cell | Checklists for the college's own opportunities and a view of student readiness (planned) |

## Technology

HTML, CSS and JavaScript. No framework, no backend, no login. A rule-based comparison runs in the browser, and details are saved in the browser's local storage. Hosted on Vercel.

## Honest limits

- Opportunities are sample data, not live or verified listings. A real version would use verified listings from organizers.
- Premium is a demo preview. No real payment happens.
- Features marked "Planned" (email and phone alerts, recurring-cycle alerts, college dashboard) are not built.

## Run it locally

1. Download or clone this repository.
2. Open `index.html` in a browser.

## Files

- `index.html`: page structure
- `style.css`: design
- `app.js`: data, rule engine and app logic
