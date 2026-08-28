Lesson 2 — TypeScript Type System Fundamentals

We’ll continue from Lesson 1 and focus on the engineering use of the type system, not memorizing syntax.

The sequence for this lesson is:

Primitive Types
    ↓
Arrays
    ↓
Tuples
    ↓
Objects
    ↓
Type Aliases
    ↓
Union Types
    ↓
Intersection Types
    ↓
Literal Types
    ↓
Interfaces
    ↓
Optional Properties
    ↓
readonly
    ↓
null / undefined
    ↓
unknown
    ↓
any
    ↓
QE Architecture Application


1. Primitive Types

The basic TypeScript types you'll use frequently are:

string
number
boolean
null
undefined
bigint
symbol

For our automation framework, the most common will be:

string
number
boolean

Example:

const username: string = "john";
const retryCount: number = 2;
const headless: boolean = true;

But remember from Lesson 1:

const username = "john";
const retryCount = 2;
const headless = true;

is usually enough because TypeScript can infer the types.

Lead SDET rule

Don't add explicit types just because TypeScript allows them.

Use them when they provide a useful contract or improve clarity.

2. number

Unlike Java, TypeScript doesn't have separate:

int
long
float
double

for ordinary numeric values.

TypeScript uses:

number

Example:

const timeout = 30000;
const retryCount = 2;
const accountBalance = 15000.75;

All are number.

QE example
interface RetryConfig {
    retries: number;
    timeout: number;
}

This is useful because the framework can communicate:

These configuration values must be numeric.

3. boolean
const headless: boolean = true;
const videoEnabled: boolean = false;

A common framework configuration might eventually look like:

interface BrowserConfig {
    headless: boolean;
    video: boolean;
}

Again, the important part isn't the syntax.

It's that the configuration contract is explicit.

4. Arrays

TypeScript gives us several ways to represent arrays.

Syntax 1

const environments: string[] = [
    "sys",
    "acc",
    "rel"
];

Syntax 2

const environments: Array<string> = [
    "sys",
    "acc",
    "rel"
];

Both are valid.

For ordinary arrays, you'll commonly see:

string[]
number[]
boolean[]

For example:

const retryCounts: number[] = [1, 2, 3];

5. Arrays with Objects

This becomes much more relevant to automation.

interface User {
    id: number;
    name: string;
}

const users: User[] = [
    {
        id: 1,
        name: "John"
    },
    {
        id: 2,
        name: "Mary"
    }
];

Now TypeScript understands:

users
  ↓
User[]
  ↓
User
  ├── id: number
  └── name: string

This becomes very useful for:

test data
API responses
accounts
beneficiaries
test users
payment data

6. Tuples

A tuple represents an array with a specific structure and position-based types.

Example:

const environmentConfig: [string, number] = [
    "sys",
    30000
];

This means:

index 0 → string
index 1 → number

So:

environmentConfig[0] // string
environmentConfig[1] // number

This differs from:

const values: (string | number)[] = [
    "sys",
    30000
];

Here the array can contain strings or numbers in arbitrary positions.

When are tuples useful?

Tuples can be useful when a function naturally returns a small fixed structure.

For example:

function getCredentials(): [string, string] {
    return ["john", "password"];
}

But don't use tuples everywhere.

For domain data such as login credentials, this is usually clearer:

interface LoginCredentials {
    username: string;
    password: string;
}

rather than:

[string, string]

Why?

Because:

credentials.username

communicates meaning.

Whereas:

credentials[0]

doesn't.

Lead SDET principle

Prefer domain-named structures when readability and maintainability matter.

7. Objects

TypeScript allows us to describe object structure.

For example:

const user: {
    id: number;
    name: string;
} = {
    id: 1,
    name: "John"
};

This works, but if the structure is reused, we should give it a name.

That's where type aliases and interfaces become important.

8. Type Aliases

We can define:

type User = {
    id: number;
    name: string;
};

Then:

const user: User = {
    id: 1,
    name: "John"
};

This is much cleaner.

For our QE platform:

type Environment = {
    name: string;
    baseUrl: string;
    timeout: number;
};

Then:

const environment: Environment = {
    name: "sys",
    baseUrl: "https://sys.example.com",
    timeout: 30000
};

9. Union Types

Union types are one of the most useful TypeScript concepts.

Syntax:

A | B

It means:

The value can be A or B.

Example:

let value: string | number;

value = "hello";
value = 100;

Both are valid.

QE Example

Imagine a test configuration can specify timeout as either:

number

or perhaps a configuration value represented as:

string

We could express:

type Timeout = number | string;

Then:

const timeout1: Timeout = 30000;
const timeout2: Timeout = "30s";

But don't use unions simply because they are convenient.

If your system actually requires a number, then:

timeout: number;

is better.

Engineering principle

Types should express the real domain constraints, not weaken them.

10. Literal Types

Literal types make the type system significantly more powerful.

Instead of:

let environment: string;

we can say:

let environment: "sys" | "acc" | "rel";

Now only these values are allowed:

environment = "sys";
environment = "acc";
environment = "rel";

But:

environment = "prod";

is rejected.

This is an excellent example of TypeScript expressing a business/framework rule.

11. Domain Types

We can combine literal types with aliases:

type Environment = "sys" | "acc" | "rel";

Then:

function runTests(environment: Environment) {
    // ...
}

Now the function has a clear contract.

runTests("sys");   // valid
runTests("acc");   // valid
runTests("rel");   // valid
runTests("prod");  // invalid

This is much stronger than:

function runTests(environment: string) {
    // ...
}

because string allows values that don't belong to our supported environment domain.

12. Intersection Types

An intersection combines types.

Syntax:

A & B

Example:

type User = {
    id: number;
    name: string;
};

type Auditable = {
    createdBy: string;
};

type AuditableUser = User & Auditable;

Now:

const user: AuditableUser = {
    id: 1,
    name: "John",
    createdBy: "automation"
};

Conceptually:

User
 ├── id
 └── name

      +

Auditable
 └── createdBy

      ↓

AuditableUser
 ├── id
 ├── name
 └── createdBy

13. Union vs Intersection

This is a common interview question.

Union
A | B

means:

A or B

Intersection
A & B

means:

A and B

Think:

Union:
       ┌── A
Value ─┤
       └── B


Intersection:

A ──┐
    ├── Combined type
B ──┘

14. Interfaces

Now we reach one of the most important concepts for framework architecture.

interface LoginCredentials {
    username: string;
    password: string;
}

Then:

const credentials: LoginCredentials = {
    username: "john",
    password: "secret"
};

The interface establishes a contract.

15. Interface vs Type

Both can describe object structures.

Type
type LoginCredentials = {
    username: string;
    password: string;
};
Interface
interface LoginCredentials {
    username: string;
    password: string;
}

For simple object shapes, both can be appropriate.

The distinction becomes more interesting as we move into:

declaration merging
extension
unions
intersections
classes
framework contracts

We'll cover this properly during the OOP section.

Current rule

Don't turn this into:

"Interfaces are always better."

or:

"Types are always better."

The Lead SDET question is:

What design problem am I solving?

16. Extending Interfaces

Interfaces can extend other interfaces.

interface User {
    id: number;
    name: string;
}

interface AdminUser extends User {
    permissions: string[];
}

Now:

const admin: AdminUser = {
    id: 1,
    name: "John",
    permissions: ["READ", "WRITE"]
};

This can be useful for related domain contracts.

But remember our program rule:

Don't introduce abstractions simply to make the framework look sophisticated.

If we don't have a real relationship, don't create one.

17. Optional Properties

Sometimes a property isn't always present.

Use:

?

Example:

interface User {
    id: number;
    name: string;
    email?: string;
}

Now this is valid:

const user: User = {
    id: 1,
    name: "John"
};

And this is also valid:

const user: User = {
    id: 1,
    name: "John",
    email: "john@example.com"
};


18. Optional Does Not Mean "Anything"

This:

email?: string;

means approximately:

email may be absent
OR
email may be a string

It does not mean:

email can be any value

That distinction is important.

19. readonly

We can prevent a property from being reassigned through the type system.

interface TestConfig {
    readonly environment: string;
    timeout: number;
}

Then:

const config: TestConfig = {
    environment: "sys",
    timeout: 30000
};

This is valid:

config.timeout = 60000;

But this is rejected:

config.environment = "acc";

The idea is:

Once the configuration object has established its environment, don't allow accidental reassignment.

20. readonly Does Not Mean Deep Immutability

This is an important nuance.

Consider:

interface Config {
    readonly testData: {
        username: string;
    };
}

testData itself cannot be replaced:

config.testData = ...; // not allowed

But the nested property may still be mutable:

config.testData.username = "newUser";

So:

readonly is not automatically deep immutability.

We'll revisit immutability when it becomes relevant to architecture.

21. null and undefined

With strict TypeScript settings, these deserve careful attention.

For example:

let username: string = "John";

This does not mean:

username = null;

is automatically valid.

If a value legitimately may not exist:

let username: string | undefined;

Now:

username = "John";
username = undefined;

are valid.

22. Why This Matters in Automation

Imagine:

const token = getToken();

What happens if authentication fails?

The function might return:

string

or:

undefined

A good type contract makes that possibility explicit:

function getToken(): string | undefined {
    // ...
}

Now callers must deal with the possibility.

That is much better than silently pretending the token always exists.

23. unknown

Now we reach an extremely important type for automation.

unknown means:

I don't know the type yet, so you must prove/check what it is before using it as a specific type.

Example:

let response: unknown;

You cannot immediately do:

response.username;

because TypeScript doesn't know what response actually is.

You must narrow it first.

For example:

if (typeof response === "string") {
    console.log(response.length);
}

24. Why unknown Is Valuable for API Testing

External systems are inherently untrusted.

Consider:

const response: unknown = await getApiResponse();

We shouldn't blindly assume:

const user = response as User;

without validation.

Instead, we should establish what the response actually contains.

This becomes especially important when we build the API layer later.

25. any

Now compare:

const response: any = await getApiResponse();

With any, TypeScript largely stops helping:

response.foo.bar.baz;
response.username;
response.whatever;

The compiler generally won't protect us.

That's why the module explicitly calls out:

Why excessive any should be avoided.

Lead SDET rule

any isn't forbidden.

But it should be intentional and justified.

26. unknown vs any

This is an important interview question.

	unknown                     	    any
Type safety	Preserved	                Mostly bypassed
Can access properties directly?	No	    Yes
Requires narrowing?	Yes	                No
Good for external/unknown data?	Yes	    Usually no
Safe default?	Much safer	            Dangerous

Think:

unknown
   ↓
"I don't know yet."
   ↓
Validate / narrow
   ↓
Use safely

Whereas:

any
   ↓
"Don't check this."


27. Putting the Concepts Together

Let's design a small piece of our future QE configuration.

type Environment = "sys" | "acc" | "rel";

interface BrowserConfig {
    readonly browser: "chromium" | "firefox" | "webkit";
    headless: boolean;
    timeout: number;
}

interface EnvironmentConfig {
    readonly environment: Environment;
    baseUrl: string;
    browser: BrowserConfig;
}

Then:

const config: EnvironmentConfig = {
    environment: "sys",
    baseUrl: "https://sys.example.com",
    browser: {
        browser: "chromium",
        headless: true,
        timeout: 30000
    }
};

Notice what we have achieved.

The compiler now understands:

EnvironmentConfig
│
├── environment
│      └── "sys" | "acc" | "rel"
│
├── baseUrl
│      └── string
│
└── browser
       │
       ├── browser
       │      └── chromium | firefox | webkit
       │
       ├── headless
       │      └── boolean
       │
       └── timeout
              └── number

This is already much closer to enterprise framework engineering than simple TypeScript syntax.

28. Architecture Insight

We can now see a fundamental principle emerging:

Types should represent meaningful domain concepts.

Instead of:

function createTest(
    env: string,
    browser: string,
    timeout: number
) {}

we can eventually evolve toward:

function createTest(config: EnvironmentConfig) {}

Now the configuration has a clear boundary.

This becomes increasingly powerful as the platform grows.

29. Common Mistakes to Avoid
❌ Everything as string
environment: string;
browser: string;
status: string;

This throws away useful domain constraints.

❌ Everything as any
config: any;
response: any;
user: any;

This destroys much of the value of TypeScript.

❌ Excessive interfaces

Don't create:

UserInterface
UserDetailsInterface
UserDataInterface
UserModelInterface
UserInfoInterface

unless there is a real architectural reason.

❌ Unnecessary unions

Don't do:

timeout: string | number | boolean | null | undefined;

just because it avoids compiler errors.

That usually means the model isn't well designed.

❌ Overusing inheritance

We will discuss this deeply later, but don't assume:

BasePage
   ↓
BaseLoginPage
   ↓
BaseSecureLoginPage
   ↓
BaseAdvancedLoginPage

is automatically good architecture.

Our program explicitly emphasizes composition over inheritance where appropriate.

30. Interview Drill

Try answering these yourself before looking at the model answers.

Q1

What is the difference between:

string[]

and:

[string, number]

string[] represents an array whose elements are strings.

[string, number] is a tuple with a defined positional structure: first element is a string and second is a number.

Q2

What is the difference between:

A | B

and:

A & B

A | B means the value can satisfy either type.

A & B combines both requirements, so the resulting value must satisfy both types.

Q3

When would you use a literal union such as:

type Environment = "sys" | "acc" | "rel";

instead of:

type Environment = string;

A literal union is appropriate when the domain has a finite set of supported values.

For our environments:

type Environment = "sys" | "acc" | "rel";

provides stronger validation than string.

Q4

What is the difference between unknown and any?

unknown preserves type safety and requires narrowing before use.

any largely bypasses TypeScript's type checking.

Therefore unknown is generally preferable for genuinely unknown external data.

Q5

Does an interface validate an API response at runtime?

No.

An interface describes a compile-time contract. It doesn't automatically validate runtime API data.

Q6

When would you choose an interface over a type alias?

Don't answer this as an absolute rule.

A strong answer should say that both can model object structures, and the choice depends on the required capabilities and design intent. Interfaces are particularly useful for extensible object/class contracts, while type aliases are very flexible for unions, intersections and composed types.


Requirement

Our Internet Banking QE platform needs to represent:

Environment

Allowed values:

sys
acc
rel

Browser

Allowed values:

chromium
firefox
webkit

Test User

Required:

username
password

Optional:

customerId

Your task is to write:

type Environment = ???

type Browser = ???

interface TestUser {
    ???
}


type Environment = "sys" | "acc" | "rel";

type Browser = "chromium" | "firefox" | "webkit";

interface TestUser {
    username: string;
    password: string;
    customerId?: string;
}


Suppose we change the requirement:

A test user may have either a customerId or an accountNumber, but at least one of them must be provided.

Would you model that simply as:

interface TestUser {
    username: string;
    password: string;
    customerId?: string;
    accountNumber?: string;
}

or would you use a stronger TypeScript type?

The stronger TypeScript design

We can use a union of object types:

type TestUser =
    | {
        username: string;
        password: string;
        customerId: string;
        accountNumber?: never;
    }
    | {
        username: string;
        password: string;
        customerId?: never;
        accountNumber: string;
    };

Now TypeScript expresses the domain rule much more accurately.

Customer ID variant
const user1: TestUser = {
    username: "john",
    password: "secret",
    customerId: "CUST001"
};

✅ Valid.

Account number variant
const user2: TestUser = {
    username: "john",
    password: "secret",
    accountNumber: "ACC001"
};

✅ Valid.

Neither
const user3: TestUser = {
    username: "john",
    password: "secret"
};

❌ Invalid.

Both
const user4: TestUser = {
    username: "john",
    password: "secret",
    customerId: "CUST001",
    accountNumber: "ACC001"
};

❌ Invalid.

Why never?

This is an important TypeScript concept.

In the first branch:

accountNumber?: never;

we're saying:

This variant must not have an accountNumber.

Similarly:

customerId?: never;

means the second variant must not have a customerId.

So we've effectively modeled:

                 TestUser
                    │
          ┌─────────┴─────────┐
          │                   │
    Customer ID           Account Number
       variant                variant
          │                   │
    customerId            accountNumber
    no accountNumber      no customerId

This is a much stronger model than simply making both properties optional.

This exercise demonstrates a very important principle:

Don't merely make the compiler happy. Use the type system to express the actual domain rules.

Compare:

Weak model
interface TestUser {
    username: string;
    password: string;
    customerId?: string;
    accountNumber?: string;
}

This permits:

neither ❌ business rule violation
both   ❌ business rule violation
one    ✅
Strong model
type TestUser =
    | CustomerIdUser
    | AccountNumberUser;

This expresses:

neither ❌
both    ❌
customerId only ✅
accountNumber only ✅

That's the kind of thinking we want throughout this module.


Before moving to functions, try this:

A banking Transfer must contain amount and fromAccount. It must contain either toAccount or beneficiaryId, but not both.

Design the TypeScript type for Transfer.

This will reinforce union types + optional properties + never before we move forward.


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

The never enhancement demonstrates a more advanced concept:

Union
  +
Optional properties
  +
never
  ↓
Mutually exclusive object shapes

This is a useful pattern for framework/domain modeling, but we should not overuse it. If the business rule doesn't require mutual exclusivity, a simple interface is often better