# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive web site for a university-level Software Quality course, framed as **Computer Science / Ciencia de la Computación** rather than "Ingeniería" — see the Branding/Positioning note below for why that word choice is deliberate. Taught practically and oriented to real industrial software production. Sister project to [Inteligencia-Artificial](https://github.com/ecuadros/Inteligencia-Artificial) and [Algebra-y-Geometria](https://github.com/ecuadros/Algebra-y-Geometria) — same visual language, same author, but a different interaction model: instead of in-browser algorithm demos, this course centers on a **real, growing Git repository per student/team** that accumulates quality practices module by module (tests → CI → static analysis → security → observability).

Deployed as a static site via **GitHub Pages** (Jekyll). No backend. The site itself is documentation/course material — the actual practice happens in each student's own GitHub repo, built with the labs described here.

## Branding / Positioning (important — read before writing copy)

**Never use the word "Ingeniería" anywhere in this site's branding, titles, or body copy** — not
in `_config.yml`, not in headings/eyebrows, not in prose. In the Peruvian/LatAm context it gets
read as a pointer to the separate "Ingeniería de Software" degree program, which the target
audience associates with people who *talk about* software without actually building it. That is
the exact opposite of what this course is. Instead, the course is positioned as:

- **Ciencia de la Computación** (Computer Science) as the academic frame.
- **Desarrollo de software a escala industrial con excelentes prácticas** as the practical frame.

Site title is `Calidad de Software — Desarrollo de Software`. When in doubt, prefer "desarrollo de
software", "construcción de software", or naming the concrete practice (pruebas, CI/CD, code
review) over any generic "ingeniería" framing — including in incidental prose like "como
ingeniero" (→ "como desarrollador") or "en ingeniería de software" (→ "en el desarrollo de
software").

## Pedagogical Model (important — read before adding content)

Unlike a course about visualizing algorithms, "quality" is demonstrated by *doing the GitHub workflow for real*, not by watching a canvas animate. Concretely:

- Each module ships a **lab** (`laboratorio`) that adds one more quality layer to the *same* student project repo — by the end of the course that repo has a full pipeline (tests, CI, static analysis, security scanning, observability), not disconnected exercises.
- **GitHub is the spine**: branch protection, mandatory PRs, CODEOWNERS, GitHub Actions, Issues/Projects for traceability. Students use the tooling, they aren't just told about it.
- **Evaluation is repo-progress-based**: graded by the real history of PRs/commits/CI runs at each module's cutoff date, not by exams. See "Evaluation" below.
- Three stacks **in parallel** per lab where code is involved: Python, C++, and Flutter/Dart, showing the equivalent quality practice in each ecosystem side by side (e.g. pytest+coverage.py, GoogleTest+gcov/lcov, and flutter_test+coverage for the same exercise). This is intentional — real engineering orgs are rarely single-stack, and the contrast surfaces quality concerns that only show up in one of the three: memory safety, build complexity, sanitizers on the C++ side; fast iteration and dynamic-typing risk on the Python side; UI/widget testing, sound null safety, and mobile-specific CI on the Flutter/Dart side.

## Tech Stack

- **Jekyll** — static site generator (GitHub Pages compatible), same layout family as the sister courses
- **Python** — pytest, coverage.py, pylint, mypy, Behave, pip-audit
- **C++** — GoogleTest/Catch2, CMake + CTest, clang-tidy, cppcheck, ASan/UBSan, Valgrind
- **Flutter/Dart** — flutter_test, integration_test (widget/golden tests), `dart analyze`/`flutter analyze` (+ `very_good_analysis` lint set), `flutter test --coverage` + lcov, `dart pub outdated`/`pub audit` for dependency scanning
- **GitHub Actions** — CI/CD pipelines, one workflow per stack where they diverge (incl. `subosito/flutter-action`)
- **SonarCloud** (or CodeClimate) — cross-language static analysis / quality gate integrated into PRs

## Planned Module Structure

```
/modulo-01-fundamentos-calidad/
/modulo-02-git-github-flujo/
/modulo-03-pruebas-unitarias-tdd/
/modulo-04-integracion-e2e-bdd/
/modulo-05-ci-cd/
/modulo-06-analisis-estatico-refactor/
/modulo-07-produccion-seguridad-observabilidad/
/modulo-08-procesos-devops/
/proyecto-final/
_layouts/
_includes/
assets/
  js/
  css/
```

Each module page is self-contained. Shared visual components (callouts, checklists, code/terminal blocks, module grid, lab nav) live in `assets/css/main.css` and `_includes/`.

## Modules and Labs (16 weeks)

| # | Módulo | Semanas | Laboratorio (repo del alumno) | Python | C++ | Flutter/Dart |
|---|--------|---------|-------------------------------|--------|-----|--------------|
| 1 | Fundamentos de Calidad y Costo de la No-Calidad | 1 | Setup del repo: branch protection, plantillas de Issue/PR, `.editorconfig` | — | — | — |
| 2 | Git/GitHub Avanzado y Flujo Colaborativo | 2–3 | Simulación de equipo: ramas, PRs cruzados, code review obligatorio, resolución de conflictos | — | — | — |
| 3 | Pruebas Unitarias y TDD | 4–5 | Kata TDD (red-green-refactor) sobre la misma feature, implementada en los tres stacks | pytest + coverage.py | GoogleTest/Catch2 + gcov/lcov | flutter_test + coverage |
| 4 | Pruebas de Integración, E2E y BDD | 6–7 | Suite de integración + escenarios Gherkin | pytest + Behave | GoogleTest (fixtures) + CTest | integration_test + golden tests |
| 5 | Integración y Entrega Continua (CI/CD) | 8–9 | Tres pipelines de GitHub Actions (uno por stack) con gates de calidad | GitHub Actions (pip, pytest) | GitHub Actions (CMake, CTest) | GitHub Actions (`flutter-action`, `flutter test`) |
| 6 | Análisis Estático, Métricas y Refactorización | 10–11 | Integrar linter/analizador al PR, refactorizar code smells detectados | pylint/mypy + SonarCloud | clang-tidy/cppcheck + SonarCloud | dart analyze + very_good_analysis + SonarCloud |
| 7 | Calidad en Producción: Seguridad, Performance, Observabilidad | 12–13 | Dependency scanning, sanitizers, logging estructurado | Snyk/pip-audit, k6 | ASan/UBSan, Valgrind | pub audit, Flutter DevTools (performance) |
| 8 | Procesos, Cultura DevOps y Postmortems | 14 | Simulación de incidente + postmortem sin culpa, Definition of Done de equipo | — | — | — |
| — | Proyecto Final | 15–16 | Pipeline de calidad end-to-end, stack a elección del equipo, sustentado mostrando el repo real | — | — | — |

## Evaluation

No traditional exams. Each module has a rubric applied to the student's own repo:
- PRs with real review (not self-approved), CI green, minimum coverage reached, no critical code smells surviving refactor, participation as reviewer on a peer's PR.
- Audited via `git log` / Actions run history at each module's cutoff date, not via separate deliverables.
- Final project = integration of everything + live defense showing the real repo.

## Development

Since this is a Jekyll site served via GitHub Pages, local development uses:

```bash
bundle install          # first time only
bundle exec jekyll serve --livereload
# Site runs at http://localhost:4000
```

To add a new module/lab page, create a file with Jekyll front matter:

```yaml
---
layout: lab
title: "Título del Laboratorio"
module: 3
module_title: "Pruebas Unitarias y TDD"
---
```

## Design Principles

- The course site documents the labs; it does not need to *run* the practices in-browser (unlike the AI course's live demos) — the practice happens in each student's own GitHub repo.
- Every module ties the concept back to a concrete production incident/cost-of-no-quality story before showing the practice, same narrative structure as the sister courses.
- Python, C++, and Flutter/Dart labs are presented side by side wherever code is involved — never one stack silently standing in for the others.
- Current status: **Módulos 1 and 2 have full content and are linked/marked "Disponible" from the index; Módulos 3-8 and the final project are still skeleton-only** — a module's links are wired up only once its content is written.
- Spanish is the primary language for UI text (course is taught in Spanish).
- Every lab page's "Autoevaluación" section has **at least 5 questions** (`.self-check` blocks, one per question, labeled "Pregunta N de 5" via `<span class="section-kicker">`), each grounded in a specific section covered on that same page — not generic trivia.
