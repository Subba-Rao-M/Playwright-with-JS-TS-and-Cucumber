Lesson 3 — Functions in TypeScript

We’ll continue with the same engineering-first approach.

The objective isn't just learning how to declare a function. We want to understand how functions become contracts, reusable framework components, callbacks, and extension points in an enterprise QE platform.

1. Basic Function Types

A simple TypeScript function:

function add(a: number, b: number): number {
    return a + b;
}

There are three important pieces:

add
│
├── a: number
├── b: number
└── returns: number

The function contract is:

Accept two numbers and return a number.

This is already stronger than an untyped JavaScript function:

function add(a, b) {
    return a + b;
}

2. Parameter Types

Every parameter can have a type.

function login(username: string, password: string) {
    // ...
}

TypeScript understands:

username → string
password → string

For our future automation framework:

async function login(
    username: string,
    password: string
) {
    // Playwright implementation later
}

The important thing is that the function's expectations are explicit.

3. Return Types

We can explicitly define the return type:

function getEnvironment(): string {
    return "sys";
}

For a configuration object:

interface EnvironmentConfig {
    environment: string;
    baseUrl: string;
}

function getConfig(): EnvironmentConfig {
    return {
        environment: "sys",
        baseUrl: "https://sys.example.com"
    };
}

Now the caller knows exactly what the function returns.

4. Should We Always Specify Return Types?

Not necessarily.

TypeScript can infer:

function getEnvironment() {
    return "sys";
}

It can determine the return type.

However, explicit return types can be valuable at important architectural boundaries.

For example:

function getEnvironmentConfig(): EnvironmentConfig {
    // ...
}

This communicates the intended contract.

Lead SDET principle

Use explicit types where they strengthen a contract; use inference where the implementation makes the type obvious.

5. Optional Parameters

Suppose we have:

function createUser(
    username: string,
    customerId?: string
) {
    // ...
}

The second parameter is optional.

Valid:

createUser("john");

Also valid:

createUser("john", "CUST001");

But:

createUser();

is invalid because username is required.

6. Default Parameters

Instead of optional parameters, sometimes we want a default value.

function runTests(
    environment: string = "sys"
) {
    // ...
}

Now:

runTests();

uses:

environment = "sys"

while:

runTests("acc");

uses:

environment = "acc"

For our framework, this can be useful for sensible defaults.

But be careful about hiding configuration mistakes.

For example, silently defaulting a production environment could be dangerous.

7. Rest Parameters

Rest parameters allow a function to receive a variable number of arguments.

function logMessages(...messages: string[]) {
    for (const message of messages) {
        console.log(message);
    }
}

We can call:

logMessages("Login started");

logMessages(
    "Login started",
    "Username entered",
    "Password entered"
);

The function receives:

messages → string[]

8. Function Types

Functions themselves can have types.

For example:

type Calculator = (
    a: number,
    b: number
) => number;

Now:

const add: Calculator = (a, b) => a + b;

This is important because functions can be treated as values.

That's different from the traditional Java mental model where we often think primarily in terms of methods attached to classes.

JavaScript/TypeScript makes functions first-class values.

9. Function Types in QE Architecture

Suppose we want a generic retry operation.

Conceptually:

type Action = () => Promise<void>;

Now Action means:

A function that accepts no arguments and returns a Promise<void>.

We could eventually have:

async function retry(action: Action) {
    // retry implementation
}

And call:

await retry(async () => {
    // Playwright operation
});

This pattern becomes extremely useful for framework utilities.

10. Callbacks

A callback is simply a function passed to another function.

Example:

function execute(action: () => void) {
    action();
}

Then:

execute(() => {
    console.log("Executing test action");
});

The important structure is:

execute()
   │
   └── receives function
             │
             ▼
          executes it

This concept is fundamental to modern JavaScript and TypeScript.

11. Higher-Order Functions

A higher-order function is a function that:

accepts another function, or
returns another function,
or both.

Example:

function execute(action: () => void): void {
    action();
}

execute is a higher-order function because it receives another function.

12. Automation Example

Imagine a generic test operation:

type Action = () => Promise<void>;

async function executeStep(action: Action): Promise<void> {
    await action();
}

Now:

await executeStep(async () => {
    console.log("Open login page");
});

Later, the action could contain Playwright operations:

await executeStep(async () => {
    await page.getByRole("button", {
        name: "Login"
    }).click();
});

We are not building this framework yet.

The point is understanding why function types matter to the architecture we'll build later.

13. Arrow Functions

The common syntax:

const add = (a: number, b: number): number => {
    return a + b;
};

For a simple expression:

const add = (a: number, b: number): number =>
    a + b;

Arrow functions are heavily used in modern TypeScript.

You'll encounter them constantly in:

callbacks
array operations
Playwright code
fixtures
configuration
asynchronous operations

14. Arrow Functions and Async

For Playwright, this combination is particularly important:

const login = async (
    username: string,
    password: string
): Promise<void> => {
    // ...
};

Conceptually:

login
 │
 ├── username: string
 ├── password: string
 ├── async
 └── Promise<void>

We'll explore Promise deeply in the Async Programming section.

For now, recognize the relationship:

async functions return promises.

15. Function Overloads

TypeScript supports function overloads.

Example:

function getValue(id: number): string;
function getValue(name: string): string;

function getValue(
    value: number | string
): string {
    return String(value);
}

Now:

getValue(100);
getValue("customer");

are both supported.

The overload signatures communicate the supported calling patterns.

16. Why Overloads Exist

Suppose an API can legitimately be called in different ways:

getUser(id)
getUser(username)

Instead of exposing:

getUser(value: any)

we can make the contract explicit.

That is much safer.

17. But Don't Overuse Overloads

This is where engineering judgment matters.

Don't create five or ten overloads simply because TypeScript allows it.

If the API becomes difficult to understand, a better domain model may be:

interface UserQuery {
    id?: string;
    username?: string;
}

or perhaps a discriminated union.

Again:

TypeScript features should solve real design problems.

Not:

"I learned overloads, so I need to use overloads."

18. Function Return Types and Domain Models

Consider our banking platform.

We could have:

interface Account {
    accountNumber: string;
    balance: number;
}

Then:

function getAccount(
    accountNumber: string
): Account {
    // ...
}

Now the function establishes:

Input
  ↓
accountNumber: string

Output
  ↓
Account

This is a clear architectural boundary.

19. Async Function Example

Later our account might come from an API.

Then:

async function getAccount(
    accountNumber: string
): Promise<Account> {
    // API call
}

Now the contract is:

Input:
string

Output:
Promise<Account>

This is one of the most important function signatures you'll encounter in Playwright/API automation.

20. Function Parameters vs Domain Objects

Consider:

function transfer(
    fromAccount: string,
    toAccount: string,
    amount: number,
    beneficiaryId?: string
) {
    // ...
}

As the function grows, it can become difficult to maintain.

We could instead use our domain model:

interface Transfer {
    amount: number;
    fromAccount: string;
    toAccount?: string;
    beneficiaryId?: string;
}

Then:

function transfer(request: Transfer) {
    // ...
}

Now the function has one meaningful domain-level parameter.

But...

We previously discussed that toAccount and beneficiaryId may be mutually exclusive.

So ideally our stronger Transfer union could be used.

This illustrates an important connection:

Type System
     ↓
Domain Model
     ↓
Function Contract
     ↓
Framework Component

This is exactly the type of engineering thinking we want to develop.

21. Avoid Boolean Parameter Traps

Consider:

function runTest(
    testName: string,
    true,
    false,
    true
) {
}

Obviously bad.

But even named booleans can become difficult:

runTest(
    "Login",
    true,
    false,
    true
);

What does each boolean mean?

A better model could be:

interface TestOptions {
    headless: boolean;
    video: boolean;
    trace: boolean;
}

Then:

runTest("Login", {
    headless: true,
    video: false,
    trace: true
});

The call site now communicates intent.

This is a maintainability decision, not merely a TypeScript syntax decision.

22. Function Design Principle — SRP

Functions should generally have a clear responsibility.

Bad:

function loginAndCreateAccountAndTransferMoney() {
    // everything
}

Better:

login()
createAccount()
transferMoney()

Then a workflow can compose them:

async function performCustomerOnboarding() {
    await login();
    await createAccount();
}

This connects directly to:

SRP
composition
reusability
testability
maintainability

which are core engineering principles for this program.

23. Function Composition

Suppose:

async function login(): Promise<void> {
    // ...
}

async function navigateToAccounts(): Promise<void> {
    // ...
}

async function verifyBalance(): Promise<void> {
    // ...
}

A workflow can compose them:

async function verifyAccountBalance(): Promise<void> {
    await login();
    await navigateToAccounts();
    await verifyBalance();
}

This is an important architectural direction:

Low-level operations
        ↓
Reusable functions
        ↓
Workflows
        ↓
Tests

We will build this idea much further in Module 02.

24. Common Function Mistakes
Mistake 1 — any parameters
function process(data: any) {
}

This removes useful contracts.

Mistake 2 — Functions doing too much
function executeEverything() {
}

Usually a sign of poor separation of responsibilities.

Mistake 3 — Too many parameters
function createUser(
    name,
    email,
    phone,
    address,
    city,
    state,
    country,
    role,
    status
) {}

Consider a domain object.

Mistake 4 — Hiding important behavior in generic helpers

For example:

doEverything(...)

A helper should make code clearer, not obscure what the test is actually doing.

Mistake 5 — Over-engineering

Don't create:

AbstractFunctionExecutor
GenericFunctionStrategy
FunctionExecutionFactory
FunctionExecutionManager

just to execute a callback.

KISS and YAGNI still apply.

25. Java Comparison

Since you know Java:

Java
public Account getAccount(String accountNumber) {
    ...
}
TypeScript
function getAccount(
    accountNumber: string
): Account {
    // ...
}

Conceptually similar.

But TypeScript functions have additional flexibility:

const getAccount = (
    accountNumber: string
): Account => {
    // ...
};

and functions can easily be passed around:

const operation = getAccount;

That functional style becomes very important in modern TypeScript.

26. Interview Questions
Technical

Q1. What is a function type in TypeScript?

A type describing the parameters and return value of a function.

Example:

type Calculator = (
    a: number,
    b: number
) => number;

Q2. What is a callback?

A function passed to another function to be invoked by it.

Q3. What is a higher-order function?

A function that accepts functions, returns functions, or both.

Q4. When would you use function overloads?

When a function legitimately supports multiple well-defined calling patterns and overload signatures improve the API contract.

Q5. Why shouldn't a function have many primitive parameters?

Because the call site becomes harder to understand and maintain, and related data may be better represented as a domain object.

Q6. What does async imply about a function's return value?

An async function returns a Promise.

For example:

async function getAccount(): Promise<Account> {
    // ...
}



Design a function for our banking QE platform:

createTransfer() should accept a Transfer request and return a Promise<string> representing the created transfer ID.

Use the Transfer concept from our previous exercise.

Start with:

type Transfer = ...

and then:

async function createTransfer(
    transfer: Transfer
): Promise<string> {
    // implementation not required yet
}
Your task

Write only the type and function signature.

Don't implement the function yet.

type Transfer =
    | {
        amount: number;
        fromAccount: number;
        toAccount: number;
        beneficiaryId?: never;
    }
    | {
        amount: number;
        fromAccount: number;
        toAccount?: never;
        beneficiaryId: number;
    };

async function createTransfer(
    transfer: Transfer
): Promise<string> {
    // implementation later
}


Understand the two different concepts

Data type
type Transfer = {
    amount: number;
    fromAccount: number;
    toAccount: number;
};

Means:

"What does a Transfer object look like?"

Function type
type CreateTransfer = (
    transfer: Transfer
) => Promise<string>;

Means:

"What does a function that creates a Transfer look like?"

These are fundamentally different.

                 Transfer
                    │
              DATA / DOMAIN
                    │
                    ▼
          { amount, accounts... }


             CreateTransfer
                    │
              FUNCTION CONTRACT
                    │
                    ▼
       (transfer) => Promise<string>


When designing a TypeScript framework, always ask:

Am I defining the shape of data, or the contract of behavior?

Data:

interface TestUser {
    username: string;
    password: string;
}

Behavior:

type LoginFunction = (
    user: TestUser
) => Promise<void>;

This distinction will become extremely important when we start designing our Playwright Page Objects, API clients, services, fixtures, and workflows.

Quick check

Which one is a function type?

A

type User = {
    name: string;
};

B

type Login = (
    username: string,
    password: string
) => Promise<void>;

C

interface Account {
    accountNumber: string;
}

Reply with A, B, or C, and then we'll continue with the next function concept.

Correct — B is the function type.

Small correction to my quiz: I accidentally labeled the options such that B is the function type, not A.

type Login = (
    username: string,
    password: string
) => Promise<void>;

This means:

Login
 │
 ├── username → string
 ├── password → string
 └── returns → Promise<void>

Whereas:

type User = {
    name: string;
};

is a data/object type.

And:

interface Account {
    accountNumber: string;
}

is also a data/object contract.

Important distinction
DATA
 ├── type User
 ├── interface Account
 └── type Transfer

BEHAVIOR
 ├── type LoginFunction
 ├── type CreateTransfer
 └── type RetryAction

This distinction will be very useful when we design our QE framework.


The function type should be:

type ApiAction = (
    url: string,
    method: string
) => Promise<string>;
Let's break it down
ApiAction
   │
   ├── url    → string
   ├── method → string
   └── return → Promise<string>

So this is valid:

const apiCall: ApiAction = async (
    url,
    method
) => {
    return `${method} ${url}`;
};

And:

const result = await apiCall(
    "https://example.com/users",
    "GET"
);

result is inferred as:

string
One Lead SDET improvement

For our real API framework, I'd eventually avoid:

method: string

because it allows invalid values:

"GET"
"POST"
"DELETE"
"INVALID_METHOD" // also allowed

We could make the contract stronger:

type HttpMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE";

type ApiAction = (
    url: string,
    method: HttpMethod
) => Promise<string>;

Now:

apiCall("/users", "GET");       // ✅
apiCall("/users", "POST");      // ✅
apiCall("/users", "INVALID");   // ❌

This is another example of the principle we've been practicing:

Use TypeScript to express domain constraints, not just primitive types.

Next concept: Optional + Default Parameters

Consider this function:

function retry(
    action: ApiAction,
    attempts?: number
): Promise<string> {
    // ...
}

The attempts parameter is optional.

But we can make the API cleaner with a default:

function retry(
    action: ApiAction,
    attempts: number = 3
): Promise<string> {
    // ...
}

Your next exercise:

Write a function type called Logger that:

accepts message: string
accepts an optional level with only "info", "warn", or "error"
returns void

type LogLevel = "info" | "warn" | "error";

type Logger = (
    message: string,
    loggerLevel?: LogLevel
) => void;

Now we've established a clean contract:

LogLevel
   │
   └── "info" | "warn" | "error"


Logger
   │
   ├── message: string          REQUIRED
   │
   ├── loggerLevel?: LogLevel   OPTIONAL
   │
   └── returns: void

6. Example implementation

Once the function type exists, an implementation could satisfy that contract:

const logger: Logger = (
    message,
    loggerLevel = "info"
) => {
    console.log(`[${loggerLevel}] ${message}`);
};

Notice something new here:

loggerLevel = "info"

We have provided a default parameter value.

Therefore:

logger("Test started");

effectively uses:

level = "info"

while:

logger("API request failed", "error");

explicitly uses "error".

This connects three Lesson 3 concepts:

Literal Union
     +
Function Type
     +
Optional Parameter
     +
Default Parameter


You should now be able to distinguish these three:

type LogLevel = "info" | "warn" | "error";

Literal union / data constraint

interface LogEntry {
    message: string;
    level: LogLevel;
}

Object/data contract

type Logger = (
    message: string,
    level?: LogLevel
) => void;

Function/behavior contract

That's an important distinction for designing a TypeScript QE framework.

Your next exercise

Let's reinforce default parameters.

Write a normal function—not a function type—called:

logMessage

Requirements:

message → required string
level → LogLevel
level should default to "info"
returns void

You already have:

type LogLevel = "info" | "warn" | "error";

Now write only:

function logMessage(...) {
    ...
}

You can use console.log inside it.
type LogLevel = "info" | "warn" | "error";
function logMessage(
    message: string,
    level: LogLevel = "info"
): void {
    console.log(`[${level}] ${message}`);
}

logMessage("Test completed", "info");
logMessage("Retrying request", "warn");
logMessage("API failed", "error");

The key isn't the logger itself. It's the pattern you're learning:

Use literal types to constrain valid domain values and default parameters to provide sensible behavior when the caller doesn't need to specify a value.


Lesson 3 Continued — Rest Parameters

You already understand required, optional, and default parameters. Now let's add rest parameters.

1. The problem rest parameters solve

Suppose our QE framework has a utility for logging test steps.

We don't know in advance how many steps will be supplied:

logTestSteps("Login");

logTestSteps(
    "Login",
    "Navigate to Accounts"
);

logTestSteps(
    "Login",
    "Navigate to Accounts",
    "Select Account",
    "Verify Balance"
);

We could accept an array:

function logTestSteps(steps: string[]): void {
    // ...
}

But then the caller has to write:

logTestSteps([
    "Login",
    "Navigate to Accounts",
    "Verify Balance"
]);

Rest parameters give us another option.

2. Rest parameter syntax
function logTestSteps(...steps: string[]): void {
    for (const step of steps) {
        console.log(step);
    }
}

The important part is:

...steps: string[]

It means:

Accept zero or more string arguments and collect them into an array called steps.

Inside the function:

steps

is simply:

string[]
3. What happens internally?

Calling:

logTestSteps(
    "Login",
    "Navigate to Accounts",
    "Verify Balance"
);

results conceptually in:

steps
  ↓
[
  "Login",
  "Navigate to Accounts",
  "Verify Balance"
]

So the function can iterate normally:

for (const step of steps) {
    console.log(step);
}
4. Normal Parameter + Rest Parameter

You can combine normal parameters with a rest parameter.

For example:

function logTestSteps(
    testName: string,
    ...steps: string[]
): void {
    console.log(`Test: ${testName}`);

    for (const step of steps) {
        console.log(step);
    }
}

Then:

logTestSteps(
    "Account Balance Verification",
    "Login",
    "Navigate to Accounts",
    "Select Savings Account",
    "Verify Balance"
);

Conceptually:

testName
   ↓
"Account Balance Verification"

steps
   ↓
[
    "Login",
    "Navigate to Accounts",
    "Select Savings Account",
    "Verify Balance"
]
5. Important rule — Rest parameter must be last

This is valid:

function log(
    prefix: string,
    ...messages: string[]
): void {
}

This is not:

function log(
    ...messages: string[],
    prefix: string
): void {
}

❌ A rest parameter must be last.

Why?

Because TypeScript/JavaScript needs to know which remaining arguments belong to the rest parameter.

6. Rest Parameter vs Array Parameter

These two functions are similar but have different calling APIs.

Array parameter
function logSteps(steps: string[]): void {
}

Caller:

logSteps([
    "Login",
    "Navigate",
    "Verify"
]);
Rest parameter
function logSteps(...steps: string[]): void {
}

Caller:

logSteps(
    "Login",
    "Navigate",
    "Verify"
);

Neither is universally better.

Use an array when

The caller naturally already has a collection:

const steps = [
    "Login",
    "Navigate",
    "Verify"
];

logSteps(steps);
Use rest parameters when

The API naturally represents:

zero or more individual arguments.

logSteps(
    "Login",
    "Navigate",
    "Verify"
);

That's an API-design decision.

7. Spread vs Rest — Don't Confuse Them

You'll see the same ... syntax used differently.

Rest

Collects multiple values:

function logSteps(...steps: string[]): void {
}

Think:

many values
    ↓
one array
Spread

Expands an existing array:

const steps = [
    "Login",
    "Navigate",
    "Verify"
];

logTestSteps(...steps);

Think:

one array
    ↓
many arguments

So:

REST
arguments → array

SPREAD
array → arguments

This distinction is frequently useful in TypeScript and Playwright code.

8. QE Architecture Consideration

Don't automatically use rest parameters because they're convenient.

For example, this isn't necessarily good:

createTransfer(
    "ACC001",
    "ACC002",
    1000,
    "INR",
    "Immediate",
    "Payment",
    "Reference123"
);

Even though we could design something with many parameters, this is hard to understand.

A domain object is better:

createTransfer({
    fromAccount: "ACC001",
    toAccount: "ACC002",
    amount: 1000
});

So our rule is:

Rest parameters are useful for variable-length homogeneous arguments, not as a substitute for good domain modeling.

Write a function called:

executeTests

Requirements:

First parameter: environment of our existing Environment type
Then accept any number of test names
Every test name must be a string
Return void
Print the environment
Print each test name

You already know:

type Environment = "sys" | "acc" | "rel";

Your starting point:

function executeTests(
    // your parameters
): void {
    // your implementation
}

type Environment = "sys" | "acc" | "rel";

function executeTests(
    environment: Environment,
    ...testNames: string[]
): void {
    for (const testName of testNames) {
        console.log(`${environment} and ${testName}`);
    }
}


for...in vs for...of

This distinction is worth remembering:

for...in
    ↓
keys / property names / indexes

for...of
    ↓
values

For an array:

const browsers = ["chromium", "firefox", "webkit"];

for...in:

for (const browser in browsers) {
    console.log(browser);
}

outputs indexes:

0
1
2

Whereas for...of:

for (const browser of browsers) {
    console.log(browser);
}

outputs:

chromium
firefox
webkit

For our automation code, when we're processing arrays of test data, accounts, browsers, users, etc., for...of is normally what you'll want when you need the values.


ext — Callbacks and Higher-Order Functions

Now we're entering a more important part of Lesson 3 for framework engineering.

Consider:

function execute(action: () => void): void {
    action();
}

The parameter:

action: () => void

doesn't contain ordinary data.

It contains a function.

So we could write:

function login(): void {
    console.log("Login executed");
}

execute(login);

Notice:

execute(login);

versus:

execute(login());

These mean very different things.

Your next exercise is deliberately small:

Given:

function login(): void {
    console.log("Login executed");
}

function execute(action: () => void): void {
    action();
}

Which is correct if we want execute() to receive the login function and decide when to execute it?

A

execute(login);

B

execute(login());

Reply with A or B and explain why.

A — Pass the function itself ✅
execute(login);

Here we're not executing login yet.

We're passing the function as a value:

login function
     ↓
execute(login)
     ↓
action receives login
     ↓
action()
     ↓
login executes

Given:

function execute(action: () => void): void {
    action();
}

action expects a function matching:

() => void

And login has exactly that signature:

function login(): void

Therefore:

execute(login);

is correct.

B — Execute first ❌
execute(login());

Here the parentheses matter:

login()

means:

Execute login right now.

Since login() returns void, the result becomes conceptually:

execute(undefined);

But execute() expects:

action: () => void

not void.

That's why B is wrong.

Think of it this way
login

means:

the function itself

while:

login()

means:

execute the function and give me its result

This distinction will become very important with Playwright.

For example, later we might have:

async function retry(
    action: () => Promise<void>
): Promise<void> {
    // retry logic
}

We might pass an operation:

await retry(async () => {
    await page.getByRole("button", {
        name: "Submit"
    }).click();
});

We're giving retry() an operation it can execute, rather than executing the operation before retry() receives it.

That enables patterns such as:

Receive operation
       ↓
Execute
       ↓
Failed?
   ↙       ↘
 yes       no
  ↓         ↓
Retry     return

This is one reason callbacks and higher-order functions matter in automation framework design.

Quick check before we continue

Given:

function logout(): void {
    console.log("Logout");
}

function runTwice(action: () => void): void {
    action();
    action();
}

What happens here?

runTwice(logout);

A. logout executes once
B. logout executes twice
C. Compile error
D. Nothing happens


✅ Correct — B. logout executes twice.

Given:

function logout(): void {
    console.log("Logout");
}

function runTwice(action: () => void): void {
    action();
    action();
}

When we call:

runTwice(logout);

we pass the function itself to runTwice.

Inside:

action();
action();

action refers to logout, so conceptually:

logout();
logout();

Output:

Logout
Logout

You've now got the important distinction:

logout       → function reference
logout()     → execute function

runTwice(logout)
         ↑
         Pass behavior to another function
Now: Higher-Order Functions

You've actually already used one.

function runTwice(
    action: () => void
): void {
    action();
    action();
}

runTwice is a higher-order function because it accepts another function as an argument.

A higher-order function can:

1. Accept a function
2. Return a function
3. Or both
Why does this matter for QE?

Imagine later we create a retry utility:

async function retry(
    action: () => Promise<void>
): Promise<void> {
    // retry logic
}

It doesn't need to know whether the action represents:

Click Submit
Call API
Create Beneficiary
Make Transfer
Wait for processing

It only knows the contract:

() => Promise<void>

This gives us behavioral composition without tightly coupling the retry utility to Playwright or a specific business operation.

That's a useful framework-design technique.


Next Exercise

Let's make sure the concept is solid before making it asynchronous.

Write a higher-order function called:

executeAction

Requirements:

accepts action, which is a function
action accepts no parameters
action returns void
executeAction itself returns void
print "Before action"
execute the supplied action
print "After action"

Then create:

function login(): void {
    console.log("Login");
}

and pass login to executeAction.


function login(): void {
    console.log("Login");
}

function executeAction(action: () => void): void {
    console.log("Before action");

    action();

    console.log("After action");
}

executeAction(login);


Now let's make this relevant to automation

Consider what executeAction knows about login.

Actually, nothing.

It only knows:

() => void

Therefore this also works:

function logout(): void {
    console.log("Logout");
}

executeAction(logout);

And:

function verifyBalance(): void {
    console.log("Verify balance");
}

executeAction(verifyBalance);

So:

executeAction
      │
      │ depends only on
      ▼
() => void
      ▲
      │
 ┌────┼────────────┐
 │    │            │
login logout verifyBalance

This is our first small example of depending on a behavioral contract rather than a concrete implementation.

Later, framework utilities such as retry, logging wrappers, timing, reporting hooks, and execution wrappers can use this idea.

Next step — Callback with parameters

So far our callback accepts nothing:

action: () => void

Let's increase the difficulty slightly.

Suppose executeAction should provide an environment to the callback.

The callback contract becomes:

(environment: Environment) => void

Your exercise:

Given:

type Environment = "sys" | "acc" | "rel";

Create:

function executeAction(
    environment: Environment,
    action: /* your function type */
): void {
    // execute action and pass environment
}

And:

function login(environment: Environment): void {
    console.log(`Login to ${environment}`);
}

We want this call:

executeAction("sys", login);

to produce:

Login to sys

Write the complete version yourself. This will confirm that you understand callbacks that themselves have parameters.

type Environment = "sys" | "acc" | "rel";

function login(environment: Environment): void {
    console.log(`Login to ${environment}`);
}

function executeAction(
    environment: Environment,
    action: (environment: Environment) => void
): void {
    action(environment);
}

executeAction("sys", login);

Output:

Login to sys

With the callback

Using:

action(environment);

makes executeAction reusable:

executeAction("sys", login);
executeAction("acc", logout);

Flow:

executeAction("sys", login)
             │       │
             │       └───────┐
             ▼               ▼
      environment="sys"   action=login
             │               │
             └──────┬────────┘
                    ▼
             action(environment)
                    │
                    ▼
               login("sys")

But:

executeAction("acc", logout);

becomes:

action = logout
environment = "acc"

       ↓

action(environment)

       ↓

logout("acc")

Now executeAction doesn't care what the concrete operation is.

5. This is important for QE architecture

Imagine later:

async function executeAction(
    action: () => Promise<void>
): Promise<void> {
    console.log("Starting action");

    await action();

    console.log("Action completed");
}

We could potentially use it with completely different operations:

executeAction(login);
executeAction(createBeneficiary);
executeAction(makePayment);
executeAction(callApi);

provided they satisfy the expected function contract.

Conceptually:

                executeAction
                      │
                      ▼
               function contract
                      │
               () => Promise<void>
                      ▲
          ┌───────────┼───────────┐
          │           │           │
        Login       Payment      API

That's the deeper reason we're learning callbacks.

It's not simply:

"TypeScript lets us pass functions."

It's:

A component can depend on a behavioral contract instead of being coupled to one concrete operation.

This will connect later to composition, dependency injection, fixtures, retry utilities and framework services.

Suppose:

function logout(environment: Environment): void {
    console.log(`Logout from ${environment}`);
}

and our corrected executeAction() uses:

action(environment);

What will this produce?

executeAction("rel", logout);

Logout from rel


Next — Callbacks with Return Values

So far our callback returned:

void

But callbacks can return values too.

Suppose we want an operation that retrieves an account balance:

function getBalance(): number {
    return 25000;
}

Now we want another function to execute that operation:

function executeOperation(
    operation: () => number
): number {
    return operation();
}

Usage:

const balance = executeOperation(getBalance);

Let's trace it:

getBalance
    ↓
passed as function
    ↓
operation = getBalance
    ↓
operation()
    ↓
getBalance()
    ↓
25000
    ↓
executeOperation returns 25000
    ↓
balance = 25000

Notice how the callback contract changed.

Previously:

action: () => void

meant:

Takes nothing and returns nothing.

Now:

operation: () => number

means:

Takes nothing and returns a number.

And therefore executeOperation itself can return that number:

function executeOperation(
    operation: () => number
): number {
    return operation();
}
Callback with parameters AND return value

We can combine both concepts.

Suppose:

function getBalance(accountNumber: string): number {
    console.log(`Getting balance for ${accountNumber}`);
    return 25000;
}

Its function signature is:

(accountNumber: string) => number

Therefore another function could accept it:

function executeOperation(
    accountNumber: string,
    operation: (accountNumber: string) => number
): number {
    return operation(accountNumber);
}

Usage:

const balance = executeOperation(
    "ACC001",
    getBalance
);

Conceptually:

accountNumber = "ACC001"
operation     = getBalance

        ↓

operation(accountNumber)

        ↓

getBalance("ACC001")

        ↓

25000

        ↓

balance = 25000

This gives us four important function contracts:

() => void

No input, no result.

(string) => void

Input, no result.

() => number

No input, returns result.

(string) => number

Input and returns result.

The same principle applies to much more complex types:

(user: TestUser) => Account

or asynchronously:

(user: TestUser) => Promise<Account>

That last pattern will be extremely important when we reach Playwright and API clients.

function getBalance(accountNumber: string): number {
    return 25000;
}

function executeOperation(
    accountNumber: string,
    operation: (accountNumber: string) => number
): number {
    return operation(accountNumber);
}

const balance = executeOperation(
    "ACC001",
    getBalance
);

async function getBalance(accountNumber: string): Promise<number> {
    return 25000;
}

async function executeOperation(accountNumber: string, operation: (accountNumber: string) => Promise<number>
): Promise<number> {
    return await operation(accountNumber);
}

const balance = await executeOperation(
    "ACC001",
    getBalance
);


his is directly relevant to Playwright

Consider:

async function clickLogin(): Promise<void> {
    await page.getByRole("button", {
        name: "Login"
    }).click();
}

The function contract is:

() => Promise<void>

A reusable execution utility could therefore accept:

action: () => Promise<void>

For example:

async function executeAction(
    action: () => Promise<void>
): Promise<void> {
    await action();
}

Then:

await executeAction(clickLogin);



async function login(): Promise<void> {
    // no meaningful value returned
}

async function getBalance(): Promise<number> {
    return 25000;
}

async function getAccount(): Promise<Account> {
    // return Account
}

You've understood the core rule:

Synchronous result        Async return type
────────────────────────────────────────────
void                        →   Promise<void>
number                      →   Promise<number>
string                      →   Promise<string>
Account                     →   Promise<Account>
TestUser                    →   Promise<TestUser>


Arrow function practice:
const getBalance = (accountNumber: string): number => 25000;
const getBalance = (accountNumber: string): number => {
    return 25000;
};

Expression body:
() => value

Block body:
() => {
    return value;
}

const getAccountNumber = (account: Account): string => account.accountNumber;
const getBalance = (accountNumber: string): number => {
    console.log(`Getting balance for ${accountNumber}`);

    return 25000;
};


interface Account {
    accountNumber: string;
    balance: number;
}
const getAccount = async (
    accountNumber: string
): Promise<Account> => {
    return {
        accountNumber,
        balance: 25000
    };
};

Why accountNumber works without accountNumber: accountNumber

This part is worth noticing:

return {
    accountNumber,
    balance: 25000
};

is shorthand for:

return {
    accountNumber: accountNumber,
    balance: 25000
};

Because the variable and property have the same name, JavaScript/TypeScript allows object property shorthand.

const fn = async (): Promise<T> => {
    const value = await somethingAsync();
    return value;
};

const result1 = getAccount("ACC001"); o/p result1 = Promise<Account>

const result2 = await getAccount("ACC001"); o/p result2 = Account

Function Overloads example:

getUser(1001);
getUser("john");

One weak approach would be:

function getUser(value: any): User {
    // ...
}

We don't want any.

We could use:

function getUser(value: number | string): User {
    // ...
}

But TypeScript also supports overload signatures:

function getUser(id: number): User;
function getUser(username: string): User;

function getUser(value: number | string): User {
    // implementation
}

There are two parts here:

Overload signatures
────────────────────
getUser(id: number): User
getUser(username: string): User

            ↓

Implementation signature
────────────────────────
getUser(value: number | string): User


function getConfig(value: string): string;
function getConfig(value: number): number;

function getConfig(value: string | number): string | number {
    return value;
}


interface Account {
    accountNumber: string;
    balance: number;
}

const getAccount = async (
    accountNumber: string
): Promise<Account> => {
    return {
        accountNumber,
        balance: 25000
    };
};

const printAccount = async (
    account: Account
): Promise<void> => {
    console.log(
        `${account.accountNumber}: ${account.balance}`
    );
};

const account = await getAccount("ACC001");

await printAccount(account);


() => void

(message: string) => void

(accountNumber: string) => number

(accountNumber: string) => Promise<number>

(accountNumber: string) => Promise<Account>

(account: Account) => Promise<void>