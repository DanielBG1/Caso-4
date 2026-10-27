# Research: Curso-PSWE-07 To-Do List

## Scope and implementation technology

**Decision**: Keep the plan and contracts technology-neutral. Defer selection
of language, framework, runtime, storage mechanism, and test runner until the
platform decision task is complete.

**Rationale**: The feature specification requests a complete application, but
does not choose a runtime or implementation technology. The repository README
states that implementing the app is not required to complete the SDD course;
that course-level statement does not narrow this feature's requested scope.
Selecting a stack without a platform decision would add an unsupported
assumption.

**Alternatives considered**: Select a web, desktop, or mobile framework during
planning. Rejected because the specification requires responsive mobile and
desktop layouts but does not state the delivery platform.

## Persistence

**Decision**: Require durable local persistence across a normal application
close and reopen, accessed only through a small persistence interface. Defer
the concrete storage mechanism.

**Rationale**: This satisfies FR-012 and the single-device assumption without
introducing accounts, sync, or an external service. The interface supports
independent tests and replaceable storage as required by the constitution.

**Alternatives considered**: In-memory-only state, rejected because it loses
tasks on restart; remote storage or synchronization, rejected because it is
out of scope.

## Task selection and ordering

**Decision**: Task operations apply to the task the user selected. Do not
prescribe a particular internal identification mechanism or task ordering.

**Rationale**: The specification requires opening and changing a selected task
but does not constrain how the application identifies it internally. Ordering
is also unspecified and does not block the described flows.

**Alternatives considered**: Requiring a specific identifier, title-based key,
or configurable ordering; rejected because these implementation choices are
not required by the user-visible specification.

## Filter behavior after a status change

**Decision**: A filtered list must contain only tasks matching the selected
status. Once the changed task is next shown in that list, it no longer appears
if its new status does not match; the task detail remains available until the
user navigates back.

**Rationale**: This follows FR-002 and FR-009 without changing the selected
filter or adding an automatic navigation behavior.

**Alternatives considered**: Keep a task visible despite its changed status,
rejected because it would violate the selected filter; automatically navigate
away from the detail, rejected because the spec does not request it.

## Failure handling and scope

**Decision**: Do not add product behavior for storage failures, multi-device
conflicts, concurrent editing, data import/export, telemetry, or regulatory
compliance in this plan. Revisit only if the product scope changes.

**Rationale**: The feature is single-user and local, with no external
integrations or compliance requirements specified. Additional operational
behavior would expand the spec.

**Alternatives considered**: Add retry, conflict resolution, analytics, or
recovery workflows now; rejected as unsupported scope.
