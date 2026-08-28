Lesson 1 — TypeScript vs JavaScript

TypeScript is essentially JavaScript with a static type system and additional language features, which are checked before the code runs.

A simple mental model:

JavaScript
    ↓
Dynamic typing
    ↓
Runtime discovers many mistakes


TypeScript
    ↓
Static type checking
    ↓
Compiler catches many mistakes earlier
    ↓
JavaScript
    ↓
Runtime execution


For our QE platform, this matters because a large automation framework contains many moving parts:

Tests
  ↓
Fixtures
  ↓
Pages
  ↓
Components
  ↓
Workflows
  ↓
API Clients
  ↓
Services
  ↓
Test Data
  ↓
Configuration

As the framework grows, we want incorrect assumptions between these components to be detected as early as possible.

2. JavaScript vs TypeScript

Consider JavaScript:

function createUser(name, age) {
    return {
        name,
        age
    };
}

const user = createUser("Ravi", "35");

JavaScript allows this because age can be any value.

The problem may only become visible later.

With TypeScript:
function createUser(name: string, age: number) {
    return {
        name,
        age
    };
}

const user = createUser("Ravi", "35");

TypeScript can identify the problem before execution:
Argument of type 'string' is not assignable to parameter of type 'number'
That's one of the fundamental advantages we want.



3. Static vs Dynamic Typing

This distinction is important for interviews.

JavaScript

JavaScript is dynamically typed.

The variable can hold different types during execution:
let value = 10;

value = "hello";

value = true;

TypeScript

TypeScript allows us to describe the intended type:

let value: number = 10;

value = "hello"; // Type error

let value: number = 10;

value = "hello"; // Type error

The important point:

TypeScript does not make JavaScript dynamically typed at runtime into a statically typed language.

Instead, TypeScript performs static analysis during development/build time.



4. TypeScript Does Not Run Directly in the Browser

This is one of the first concepts you should understand properly.

Suppose we have:

const userName: string = "John";

The browser doesn't need to understand the TypeScript annotation.

The TypeScript compiler can transform it into JavaScript roughly like:

const userName = "John";

Conceptually:

                    Development
                        │
                        ▼
                 TypeScript source
                   (.ts / .tsx)
                        │
                        ▼
                TypeScript compiler
                        │
              ┌─────────┴─────────┐
              │                   │
       Type checking          Transpilation
              │                   │
              └─────────┬─────────┘
                        ▼
                    JavaScript
                        │
                        ▼
                 Node.js / Browser

This distinction will become important later when we discuss:

tsconfig.json
Playwright
Node.js
CI/CD
build pipelines


5. Compile-Time vs Runtime

This is a Lead SDET interview-level distinction.

Consider:

function add(a: number, b: number): number {
    return a + b;
}

TypeScript checks:

a → number
b → number
return → number

But the type annotations do not exist in the resulting JavaScript in the same way.

Therefore:

TypeScript's type system primarily protects us during development and compilation; it does not automatically provide runtime validation.

This is extremely important for API testing.

For example:

interface User {
    id: number;
    name: string;
}

This does not automatically validate that an HTTP response actually contains:

{
  "id": 123,
  "name": "John"
}

If the API returns:

{
  "id": "ABC",
  "name": 123
}

TypeScript's interface alone does not magically validate that runtime response.

We'll revisit this when we reach API automation and runtime validation.

6. Why This Matters for SDET

Imagine an enterprise framework has:

class LoginPage {
    async login(username: string, password: string) {
        // ...
    }
}

And another component calls:

await loginPage.login(username, password);

The type system gives us a contract:

LoginPage.login()
       │
       ├── username → string
       └── password → string

Now imagine someone accidentally changes:

await loginPage.login(userId, credentials);

If those values have incompatible types, TypeScript can detect the problem.

This becomes increasingly valuable as our framework grows.



7. TypeScript's Real Value in Our QE Platform

The goal isn't:

"Use TypeScript because Playwright supports it."

That's too shallow.

Our goal is:

Use TypeScript to make the automation platform safer, more maintainable and easier to evolve.

Consider our future framework:

Test
 │
 ├── Fixture
 │     │
 │     ├── Page
 │     ├── API Client
 │     └── Test Data
 │
 └── Workflow
       │
       ├── Service
       └── Component

Each boundary can have explicit contracts.

For example:

interface LoginCredentials {
    username: string;
    password: string;
}

Then:

async function login(credentials: LoginCredentials) {
    // ...
}

Now the framework communicates its expectations directly through the code.

This is one of the major engineering benefits we'll build upon throughout Module 01.



8. Type Inference

TypeScript doesn't require us to annotate everything.

For example:

const userName = "John";

TypeScript can infer:

userName → string

Similarly:

const retryCount = 3;

TypeScript understands that retryCount is a number.

Therefore, we should not blindly annotate every variable:

const userName: string = "John";
const retryCount: number = 3;

when inference already communicates the type clearly.

A good engineering principle is:

Use explicit types where they improve contracts or clarity; rely on inference where the type is obvious.

This becomes especially important when writing clean framework code.

9. Explicit Types vs Inference
Prefer inference here
const environment = "sys";
const retryCount = 3;

The types are obvious.

Explicit type is useful here
function getEnvironment(): string {
    // ...
}

The function's contract is important.

Or:

interface LoginCredentials {
    username: string;
    password: string;
}

The interface defines a reusable contract.

So we shouldn't follow:

"Always specify types."

Nor:

"Never specify types."

Instead:

Use the type system intentionally.



10. A First QE Example

Consider test configuration:

const environment = "sys";
const browser = "chromium";
const retries = 2;

TypeScript infers:

environment → string
browser     → string
retries      → number

But later we'll probably want a stronger contract.

For example:

type Environment = "sys" | "acc" | "rel";

Now:

const environment: Environment = "sys";

is valid.

But:

const environment: Environment = "production";

is rejected.

This is much more valuable for an enterprise automation framework because we can express business/framework constraints, not merely primitive types.

We'll explore this properly when we reach literal and union types.



11. Java Comparison

Since you already know Java, here's a useful comparison.

Java
String username = "john";
int retryCount = 3;

TypeScript
const username: string = "john";
const retryCount: number = 3;

But don't assume TypeScript is simply:

"Java with different syntax."

There are significant differences in:

Runtime model
Type erasure
Structural typing
JavaScript interoperability
Functions as first-class values
Async programming
Object model
Type system capabilities

We'll deliberately learn these differences instead of trying to force Java concepts into TypeScript.



12. Lead SDET Architecture Insight

Here's the first important architectural lesson.

A mature automation framework should use types to establish contracts between components.

For example:

Configuration
      │
      ▼
EnvironmentConfig
      │
      ▼
Test Fixture
      │
      ▼
Workflow
      │
      ▼
Page / API Client

Each boundary should communicate clearly.

Instead of loosely passing:

any

everywhere, we want meaningful domain types:

EnvironmentConfig
LoginCredentials
User
Account
Payment
Transfer

This is where TypeScript becomes an engineering tool, not just a Playwright scripting language.



13. Common Mistakes
Mistake 1 — Using any everywhere
const response: any = ...

This effectively tells TypeScript:

"Don't help me here."

We'll learn why unknown is often safer.

Mistake 2 — Typing everything unnecessarily
const name: string = "John";
const count: number = 10;
const active: boolean = true;

Sometimes this adds noise without providing useful information.

Mistake 3 — Thinking interfaces validate runtime data

They don't.

interface User {
    id: number;
}

doesn't validate an HTTP response at runtime.

Mistake 4 — Treating TypeScript as a replacement for good design

Strong typing cannot fix:

Poor architecture
Bad module boundaries
Shared mutable state
Poor test isolation
Bad abstractions
Flaky asynchronous design

TypeScript is an engineering enabler, not an architecture replacement.



14. Interview Questions
Technical

Q1. What is TypeScript?

Strong answer:

TypeScript is a statically typed superset of JavaScript that adds a compile-time type system and other language features. TypeScript code is transformed into JavaScript for execution, while the type system helps detect many errors during development and compilation.

Q2. Does TypeScript provide runtime type safety?

Strong answer:

Not by default. TypeScript's static type system is primarily compile-time. Type annotations and interfaces don't automatically validate runtime data, so external data such as API responses may require explicit runtime validation.

Q3. What is type inference?

Strong answer:

Type inference is TypeScript's ability to determine a value's type from its context without requiring an explicit annotation. It helps reduce unnecessary type declarations while maintaining type safety.

Q4. Why would you use TypeScript for a large Playwright framework?

A Lead-level answer should discuss:

Type safety
     +
Explicit contracts
     +
Maintainability
     +
IDE support
     +
Refactoring safety
     +
Better module boundaries
     +
Large-team consistency

rather than simply saying:

"Because Playwright supports TypeScript."



15. Key Takeaway

The most important concept from today's lesson is:

TypeScript is not valuable merely because it adds types. It is valuable because those types can become contracts between components in an engineering system.

For our future Modern QE Platform:

TypeScript
    ↓
Strong contracts
    ↓
Better components
    ↓
Better architecture
    ↓
Safer refactoring
    ↓
More maintainable Playwright platform

That is the mindset we will carry throughout Module 01.

Next concept

Lesson 2 — TypeScript Type System Fundamentals

We'll go deeper into:

string → number → boolean → arrays → tuples → objects → union → intersection → literal types → type aliases → interfaces → optional → readonly → null/undefined → unknown → any

and, importantly, when a Lead SDET should choose each one and when not to.