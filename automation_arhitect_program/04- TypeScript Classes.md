Lesson 4 — OOP for TypeScript QE Engineering

1. Why do classes exist?

You already know how to model data:

interface TestUser {
    username: string;
    password: string;
}

And behavior:

function login(username: string, password: string): void {
    // login
}

A class becomes useful when state/data and behavior naturally belong together.

For example, conceptually:

LoginPage
│
├── State / dependencies
│   └── page
│
└── Behavior
    ├── enterUsername()
    ├── enterPassword()
    └── login()

The important engineering idea is not:

"OOP means putting everything inside classes."

Instead:

A class can represent a cohesive object that owns related state and exposes behavior operating on that state.

This connects directly to high cohesion.

2. Basic TypeScript class

Start with something simple before introducing Playwright.

class TestUser {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    printUser(): void {
        console.log(this.username);
    }
}

Creating an object:

const user = new TestUser("testuser", "password123");

Calling behavior:

user.printUser();

Conceptually:

class TestUser
      │
      │ new
      ▼
user object
      │
      ├── username = "testuser"
      ├── password = "password123"
      │
      └── printUser()

The class describes the structure and behavior.

The object is an instance created from that class.

3. Properties

These are class properties:

class TestUser {
    username: string;
    password: string;
}

They represent state belonging to an object.

For example:

const user1 = new TestUser("user1", "pass1");
const user2 = new TestUser("user2", "pass2");

user1 and user2 are separate objects with separate state.

Very similar conceptually to Java.

4. Constructor

The constructor initializes an object.

constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
}

When this executes:

const user = new TestUser("testuser", "password123");

TypeScript effectively performs:

Allocate TestUser object
        ↓
Call constructor(...)
        ↓
username assigned
password assigned
        ↓
Return initialized object

this refers to the current object.

Therefore:

this.username = username;

means:

this.username
      ↑
object property

username
   ↑
constructor parameter

5. Initialization matters in TypeScript

Suppose we write:

class TestUser {
    username: string;
    password: string;
}

With normal strict TypeScript settings, you'll encounter a problem because TypeScript asks:

How do you guarantee these properties have values after construction?

That's valuable for QE framework engineering.

You don't want objects such as:

EnvironmentConfig
    environment = ???
    baseUrl = ???

floating around partially initialized.

A constructor establishes that initialization:

class TestUser {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

This supports one of the principles we're reinforcing throughout your course:

Fail fast rather than allowing invalid framework state to travel deeper into execution.

6. Methods

A method is behavior belonging to the object.

class TestUser {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    printUser(): void {
        console.log(this.username);
    }
}

Compare:

function printUser(user: TestUser): void {
    console.log(user.username);
}

versus:

user.printUser();

Neither is automatically better.

That's important.

A common OOP mistake is assuming:

"If I can put something inside a class, I should."

Instead ask:

Does this behavior logically belong to this object?

That distinction becomes very important when we later decide whether behavior belongs in:

LoginPage
AccountPage
PaymentWorkflow
ApiClient
utility function
fixture
service

7. TypeScript parameter properties

Now we reach something you'll notice immediately coming from Java.

Our class currently has duplication:

class TestUser {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

TypeScript provides parameter properties.

We can write:

class TestUser {
    constructor(
        public username: string,
        public password: string
    ) {}
}

That automatically declares and initializes the properties.

Conceptually, TypeScript is doing the equivalent of:

class TestUser {
    public username: string;
    public password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

So this:

constructor(
    public username: string
)

is doing two jobs:

constructor parameter
        +
class property
        +
assignment

This is a TypeScript-specific convenience that doesn't have a direct equivalent in normal Java syntax.

8. QE example — EnvironmentConfig

Now let's make it more relevant to automation.

type Environment = | "sys" | "acc" | "rel";

class EnvironmentConfig {
    constructor(
        public environment: Environment,
        public baseUrl: string
    ) {}

    printConfig(): void {
        console.log(`${this.environment}: ${this.baseUrl}`);
    }
}

Usage:

const config = new EnvironmentConfig(
    "acc",
    "https://acc.example.com"
);

config.printConfig();

Notice how previous lessons are now combining:

Lesson 2
Literal union
    ↓
Environment

Lesson 3
Functions / methods
    ↓
printConfig()

Lesson 4
Class + constructor
    ↓
EnvironmentConfig

We're starting to move from individual TypeScript features toward engineering objects.

9. First glimpse of a Page Object

Don't worry about actual Playwright syntax yet.

Imagine:

class LoginPage {
    constructor(
        public page: Page
    ) {}

    async login(
        username: string,
        password: string
    ): Promise<void> {
        // interact with page
    }
}

Creation might eventually look conceptually like:

const loginPage = new LoginPage(page);

Notice something important.

The class doesn't create the browser page itself:

class LoginPage {
    constructor(
        public page: Page
    ) {}
}

Something else provides page.

That small design decision will eventually lead us into:

Constructor injection
        ↓
Dependency injection
        ↓
Composition
        ↓
Playwright fixtures

But we're not going there yet.

For now, just notice that constructors can receive the dependencies an object needs.

10. Java comparison

The concepts are familiar:

Concept	                Java	                    TypeScript
Class	                class TestUser	            class TestUser
Constructor	            TestUser(...)	            constructor(...)
Object creation	        new TestUser(...)	        new TestUser(...)
Current object	        this	                    this
Method	                class method	            class method
Property declaration	explicit field	            explicit or parameter property
Parameter properties	No equivalent shorthand	    Supported

Java:

class TestUser {

    private String username;

    TestUser(String username) {
        this.username = username;
    }
}

TypeScript can similarly write:

class TestUser {
    private username: string;

    constructor(username: string) {
        this.username = username;
    }
}

but also:

class TestUser {
    constructor(
        private username: string
    ) {}
}

This compact syntax becomes very common in TypeScript codebases.

We'll examine private, public, and protected properly in Lesson 4.2, so don't worry about their design implications yet.

11. Engineering checkpoint

At Lead SDET level, I want you to start separating three ideas:

Interface / Type
        ↓
"What shape/contract does this have?"

Class
        ↓
"What state + behavior does this implementation own?"

Object
        ↓
"A concrete runtime instance"

And especially avoid:

Need some reusable code
        ↓
Create class
        ↓
Create BaseSomething
        ↓
Everything extends BaseSomething

That's exactly how automation frameworks often evolve into:

BaseTest
   ↓
BasePage
   ↓
CommonPage
   ↓
ApplicationPage
   ↓
LoginPage

We will challenge that architecture later when we reach composition vs inheritance, which your handoff explicitly identifies as an important part of this module.


class ApiClient {
    constructor(
        public baseUrl: string,
        public timeout: number
    ) {}

    printConfig(): void {
        console.log(`Base URL: ${this.baseUrl}`);
        console.log(`Timeout: ${this.timeout}`);
    }
}

const client = new ApiClient(
    "https://api.example.com",
    5000
);

client.printConfig();



Lesson 4.2 — Access Modifiers and Encapsulation

Let's start with just one question before I teach the concept.

Given:

class ApiClient {
    constructor(
        public baseUrl: string,
        public timeout: number
    ) {}
}

const client =
    new ApiClient("https://api.example.com", 5000);

All of these currently work:

console.log(client.baseUrl);

client.baseUrl = "https://wrong.example.com";

client.timeout = 10000;

From a QE framework design perspective, which of those operations do you think should be allowed?

or baseUrl, a good framework design would usually be:

console.log(client.baseUrl); // ✅ Allow reading

but:

client.baseUrl = "https://wrong.example.com"; // ❌ Prefer not to allow

The reason is that baseUrl is normally part of the configuration of the API client. Once the client has been created for a particular environment, changing the URL later can make the object inconsistent and cause tests to hit the wrong environment.

So conceptually:

Create ApiClient
    ↓
baseUrl = fixed configuration
    ↓
Use that URL for requests

rather than:

Create ApiClient for ACC
    ↓
some test changes baseUrl
    ↓
same client suddenly points to SYS/REL

That is exactly where readonly will become useful.

For example, eventually we could write:

class ApiClient {
    constructor(
        public readonly baseUrl: string,
        public readonly timeout: number
    ) {}
}

Then this is allowed:

console.log(client.baseUrl);

but this is rejected by TypeScript:

client.baseUrl = "https://wrong.example.com";

Same concept holds good for timeout also.





Lesson 4.2 — Access Modifiers and Encapsulation

We established that our ApiClient configuration should not be freely changed after construction. Now we need to separate two concepts that are often confused:

Access control — who can access something?

Mutability control — can its value be changed?

That leads us to public, private, protected, and readonly.

1. public

Consider:

class ApiClient {
    constructor(
        public readonly baseUrl: string,
        public readonly timeout: number
    ) {}
}

const client = new ApiClient("https://api.example.com", 5000);

Because these properties are public, outside code can read them:

console.log(client.baseUrl);
console.log(client.timeout);

But because they're also readonly, outside code cannot reassign them:

client.baseUrl = "https://other.example.com"; // ❌
client.timeout = 10000;                       // ❌

So:

public
   ↓
Who can ACCESS it?
Outside code can.

readonly
   ↓
Can it be REASSIGNED?
No.

These solve different problems.

2. TypeScript's default is public

This is important coming from Java.

These are effectively equivalent:

class ApiClient {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
}

and:

class ApiClient {
    public baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
}

If you don't specify an access modifier, TypeScript class members are public.

Java comparison

This is different from Java.

In Java, omitting an access modifier gives package-private access.

String baseUrl;

does not mean public.

In TypeScript:

baseUrl: string;

is public.

That's a useful interview distinction.

3. private

Suppose our ApiClient stores an authentication token:

class ApiClient {
    constructor(
        public readonly baseUrl: string,
        private token: string
    ) {}
}

Inside the class:

class ApiClient {
    constructor(
        public readonly baseUrl: string,
        private token: string
    ) {}

    printTokenLength(): void {
        console.log(this.token.length); // ✅
    }
}

But outside:

const client = new ApiClient("https://api.example.com", "abc123");

console.log(client.token); // ❌

TypeScript prevents access because token is private.

Conceptually:

                ApiClient
              ┌──────────────┐
outside ─────► │ baseUrl      │ public
              │              │
outside ──X──► │ token        │ private
              │              │
              │ methods can  │
              │ use token    │
              └──────────────┘

But there's a deeper engineering question.

Why make it private?

Not merely because:

"Sensitive fields should be private."

The stronger OOP reason is:

Consumers of ApiClient shouldn't need to know how authentication state is internally represented or managed.

For example, instead of:

client.token

we would rather expose meaningful behavior:

await client.get("/accounts");

The caller says what it wants done.

The ApiClient decides how authentication is applied.

That's encapsulation.

4. Encapsulation is NOT "private + getters/setters"

This is a common interview-level misunderstanding.

Suppose we write:

class ApiClient {
    private timeout: number = 5000;

    getTimeout(): number {
        return this.timeout;
    }

    setTimeout(timeout: number): void {
        this.timeout = timeout;
    }
}

We've made the property private, but then provided unrestricted mutation through:

client.setTimeout(-5000);

Have we really protected the object's rules?

Not much.

We mostly replaced:

client.timeout = -5000;

with:

client.setTimeout(-5000);

That's not the real purpose of encapsulation.

A better question is:

What states should an ApiClient be allowed to enter?

For example, perhaps:

timeout > 0

is an invariant — a rule that should always remain true for a valid ApiClient.

5. Protecting an invariant

Imagine we intentionally allow timeout changes.

We could control that change:

class ApiClient {
    constructor(
        public readonly baseUrl: string,
        private timeout: number
    ) {
        if (timeout <= 0) {
            throw new Error(
                "Timeout must be greater than zero"
            );
        }
    }

    updateTimeout(timeout: number): void {
        if (timeout <= 0) {
            throw new Error(
                "Timeout must be greater than zero"
            );
        }

        this.timeout = timeout;
    }
}

Now callers cannot directly do:

client.timeout = -5000; // ❌

They must go through:

client.updateTimeout(10000); // ✅

and:

client.updateTimeout(-5000); // runtime error

Now private is serving an engineering purpose:

private state
     ↓
controlled behavior
     ↓
validation
     ↓
object invariant protected

That's genuine encapsulation.

However, in our original design, we decided timeout shouldn't change at all. Therefore the simpler solution is probably:

public readonly timeout: number

rather than introducing updateTimeout().

This is where YAGNI and KISS matter.

Don't build mutation machinery when the domain doesn't require mutation.

6. protected

Now the third modifier:

protected

A protected member can be accessed by:

the class itself
      +
subclasses

but not normal outside callers.

For example:

class ApiClient {
    constructor(
        protected readonly baseUrl: string
    ) {}
}

class AccountApiClient extends ApiClient {

    printUrl(): void {
        console.log(this.baseUrl); // ✅
    }
}

Outside:

const client = new AccountApiClient("https://api.example.com");

console.log(client.baseUrl); // ❌

So, at a simplified level:

Modifier	Same class	Subclass	Outside
public	    ✅	        ✅          ✅
protected	✅	        ✅	       ❌
private	    ✅	        ❌	       ❌

We'll revisit protected when we learn inheritance because that's where its design implications become much more meaningful.

7. Why not make everything private?

You might hear:

"Best practice is make everything private."

That's too simplistic.

Consider:

class EnvironmentConfig {
    constructor(
        public readonly baseUrl: string,
        public readonly environment: Environment
    ) {}
}

Usage:

console.log(config.baseUrl);

That's perfectly reasonable if these are intentionally exposed configuration values.

Making everything private:

private readonly baseUrl: string;

and then creating:

getBaseUrl(): string {
    return this.baseUrl;
}

may add ceremony without providing meaningful protection.

The design question should be:

What should consumers of this object legitimately know or do?

Not:

How many fields can I make private?

A poor design can expose implementation details everywhere:

loginPage.usernameLocator.click();
loginPage.passwordLocator.fill("...");
loginPage.submitLocator.click();

The test now knows too much about how login works.

A stronger abstraction could eventually expose:

await loginPage.login(username, password);

The internal mechanics remain inside LoginPage.

That's encapsulation at the behavior/design level, not merely at the variable level.

"What is encapsulation?"

An incomplete answer would be:

Encapsulation means making variables private and accessing them through getters and setters.

A stronger engineering answer is:

Encapsulation means controlling an object's internal state and implementation details while exposing a meaningful public API. It helps protect invariants, prevents uncontrolled state changes, and reduces coupling between consumers and implementation details.

That answer translates directly into automation architecture.

class ApiClient {
    constructor(
        public readonly baseUrl: string,
        public readonly timeout: number,
        private token : string
    ) {}

    printConfig(): void {
        console.log(`Base URL: ${this.baseUrl}`);
        console.log(`Timeout: ${this.timeout}`);
    }
}

const client = new ApiClient(
    "https://api.example.com",
    5000,
    "abc123"
);




Lesson 4.3 — Encapsulation

Now we're ready for the deeper part.

Consider two designs for authentication.

Design A
client.token = "abc123";

await client.get("/accounts");
Design B
client.authenticate("abc123");

await client.get("/accounts");

Both could ultimately put "abc123" into the API client's internal authentication state.

But from an OOP/framework-design perspective, Design B can provide stronger encapsulation.

Before I explain why, I want you to reason about it.

Suppose authentication requires:

1. Validate token isn't empty
2. Store token
3. Add "Bearer " prefix when sending requests
4. Never expose the raw token to tests

Why might:

client.authenticate("abc123");

be a better API than allowing tests to directly manipulate:

client.token

Think in terms of who should be responsible for the authentication rules: the test or ApiClient?

Exactly — ApiClient should own those authentication rules.

That is the core encapsulation idea here.

If tests directly manipulate:

client.token

then every test now needs to know things like:

whether empty tokens are allowed
how tokens are formatted
whether "Bearer " must be added
whether tokens can change
whether raw tokens should be hidden

That spreads implementation knowledge across the test suite and increases coupling.

A better design is:

client.authenticate("abc123");

Now the test only expresses intent:

Authenticate this client

while ApiClient owns the implementation details:

validate token
store token
format Authorization header
hide raw token

That gives us:

Test
  ↓
asks for behavior

ApiClient
  ↓
owns authentication rules

This is stronger than simply saying "token is private." The real value is that the object exposes meaningful behavior and protects its internal rules.

For a Lead SDET interview, a strong explanation would be:

Encapsulation is about keeping state and implementation rules inside the component that owns them, while exposing a small meaningful API to consumers. In a QE framework, tests should request behaviors such as authenticate or submitPayment rather than directly manipulating internal state or locators.

class ApiClient {
    private token: string | undefined;

    constructor(
        public readonly baseUrl: string,
        public readonly timeout: number
    ) {}

    printConfig(): void {
        console.log(`Base URL: ${this.baseUrl}`);
        console.log(`Timeout: ${this.timeout}`);
    }

    authenticate(token: string): void {
        if (token.trim() ==="") {
            throw new Error("Token cannot be empty");
        }

        this.token = token;
    }
}

const client = new ApiClient(
    "https://api.example.com",
    5000
);

client.authenticate("abc123");


Lesson 4.4 — readonly and Immutability

We already used:

public readonly baseUrl: string

and:

public readonly timeout: number

But there's an important trap.

Suppose we have:

interface ApiConfig {
    baseUrl: string;
    headers: string[];
}

class ApiClient {
    constructor(
        public readonly config: ApiConfig
    ) {}
}

Then:

const client = new ApiClient({
    baseUrl: "https://api.example.com",
    headers: ["Content-Type"]
});

TypeScript prevents:

client.config = anotherConfig; // ❌

Now here's the question:

Do you think readonly also prevents this?

client.config.baseUrl = "https://wrong.example.com";

client.config.headers.push("Authorization");

In other words, does:

readonly config: ApiConfig

make the entire ApiConfig object immutable, or only prevent replacing the config reference?

What do you think?

only config reference

Exactly. ✅

readonly on an object property protects the reference/property assignment, not the entire object behind that reference.



Lesson 4.4 — readonly and Immutability

Given:

interface ApiConfig {
    baseUrl: string;
    headers: string[];
}

class ApiClient {
    constructor(
        public readonly config: ApiConfig
    ) {}
}

This is prohibited:

client.config = anotherConfig; // ❌

because you're trying to replace config.

But these are still allowed:

client.config.baseUrl =
    "https://wrong.example.com"; // ✅

client.config.headers.push(
    "Authorization"
); // ✅

Why? Because readonly here is shallow.

Conceptually:

client
  │
  └── config ───────────────► ApiConfig object
       ↑                       │
       │                       ├── baseUrl
       │                       └── headers[]
       │
       └── readonly

Cannot change where config points.

But the object it points to can still be modified.

readonly vs const

This is another important distinction.

Consider:

const config = {
    baseUrl: "https://api.example.com"
};

You cannot do:

config = {
    baseUrl: "https://other.example.com"
}; // ❌

But you can do:

config.baseUrl =
    "https://other.example.com"; // ✅

const protects the variable binding.

Similarly:

readonly config: ApiConfig;

protects the class property from reassignment.

Neither automatically makes the nested object immutable.

Think of it this way:

const
   ↓
variable cannot point somewhere else

readonly property
   ↓
property cannot point somewhere else

Neither automatically means
   ↓
object contents cannot change
Making the object's properties readonly

We could instead define:

interface ApiConfig {
    readonly baseUrl: string;
    readonly timeout: number;
}

Now:

const config: ApiConfig = {
    baseUrl: "https://api.example.com",
    timeout: 5000
};

config.baseUrl =
    "https://wrong.example.com"; // ❌

That's stronger because baseUrl itself is readonly.

But let's make it more interesting:

interface ApiConfig {
    readonly baseUrl: string;
    readonly headers: string[];
}

Can we do this?

config.headers = ["Authorization"]; // ❌

No. The headers property can't be reassigned.

But what about:

config.headers.push("Authorization");

Surprisingly, yes.

Why?

Because the property is:

readonly headers: string[];

The property reference is readonly, but the array itself is still mutable.

Again:

readonly headers: string[]
         │
         │ cannot replace
         ▼
     ┌─────────┐
     │ Array   │
     │         │
     │ item 1  │ ← contents can change
     │ item 2  │
     └─────────┘
readonly string[]

If we don't want consumers modifying the array either:

interface ApiConfig {
    readonly baseUrl: string;
    readonly headers: readonly string[];
}

Now:

config.headers.push("Authorization"); // ❌

because the array itself is exposed as readonly.

This is especially useful for configuration-like data.

Important TypeScript limitation

Even this:

interface ApiConfig {
    readonly baseUrl: string;
    readonly headers: readonly string[];
}

is primarily a compile-time contract.

TypeScript's readonly does not magically freeze JavaScript objects at runtime.

This connects back to Lesson 1:

TypeScript
readonly
    ↓
compile-time protection

JavaScript runtime
    ↓
object still exists as a normal JS object

Runtime immutability is a separate subject—for example, JavaScript has Object.freeze().

So a strong interview answer to:

Does TypeScript readonly make an object immutable?

would be:

Not necessarily. readonly prevents reassignment of the property at compile time. If the property references a mutable object or array, its internal contents may still be changed unless those nested structures are also modeled as readonly. It also doesn't by itself provide runtime immutability.

That's much stronger than simply saying "readonly means you can't change the variable."

Why this matters in QE frameworks

Imagine:

interface EnvironmentConfig {
    readonly environment: "sys" | "acc" | "rel";
    readonly baseUrl: string;
    readonly apiUrl: string;
    readonly timeout: number;
}

Once execution starts, we generally don't want random tests doing:

config.environment = "rel";
config.baseUrl = "something";
config.timeout = 1;

Configuration should ideally flow:

Environment variables / config files
              ↓
       Config loader
              ↓
      validated config
              ↓
       test execution
              ↓
          READ ONLY

rather than:

Config
 ↓
Test A changes it
 ↓
Test B receives changed state
 ↓
Test B behaves differently
 ↓
flaky parallel execution

This becomes particularly important when we eventually discuss Playwright workers, fixtures and parallel execution.

interface TestConfig {
    readonly environment: string;
    readonly browsers: readonly string[];
}

class TestRunner {
    constructor(
        public readonly config: TestConfig
    ) {}
}

public readonly config: TestConfig
                │
                └── Can't replace config
                         ↓
        readonly environment
                │
                └── Can't replace environment

        readonly browsers
                │
                └── Can't replace browsers array
                         ↓
               readonly string[]
                         │
                         └── Can't mutate array



Lesson 4.5 — Interfaces as Behavioral Contracts

Now we're moving to an important OOP concept.

You've already learned interfaces as data contracts.

For example:

interface TestConfig {
    readonly environment: string;
    readonly browsers: readonly string[];
}

This describes data.

But interfaces can also describe behavior.

Consider:

interface Logger {
    log(message: string): void;
}

Notice what's different.

We're not saying:

Logger contains:
    name
    level
    path

We're saying:

Anything considered a Logger must provide this behavior.

log(message: string): void

That's a behavioral contract.

A concrete implementation

We could create:

class ConsoleLogger implements Logger {

    log(message: string): void {
        console.log(message);
    }
}

The important keyword here is:

implements Logger

We're saying:

ConsoleLogger promises to satisfy the Logger contract.

Therefore this would be incorrect:

class ConsoleLogger implements Logger {

    print(message: string): void {
        console.log(message);
    }
}

Why?

Because Logger requires:

log(message: string): void;

but ConsoleLogger provides:

print(message: string): void;

The contract isn't satisfied.

Why is this useful?

Imagine our ApiClient wants logging.

We could write:

class ApiClient {
    constructor(
        private readonly logger: ConsoleLogger
    ) {}
}

Now ApiClient depends specifically on:

ConsoleLogger

Later we introduce:

class FileLogger {
    log(message: string): void {
        // write to file
    }
}

But ApiClient explicitly expects:

ConsoleLogger

We've coupled the API client to one particular logger implementation.

Instead:

class ApiClient {
    constructor(
        private readonly logger: Logger
    ) {}
}

Now:

              Logger
                 ↑
           behavioral contract
             /       \
            /         \
ConsoleLogger        FileLogger

ApiClient doesn't care how logging happens.

It only cares that its dependency can:

logger.log(message);

This starts connecting several engineering concepts:

Interface
    ↓
Abstraction
    ↓
Depend on behavior rather than implementation
    ↓
Lower coupling
    ↓
Easier replacement/testing

Later we'll connect this directly to Dependency Inversion and Dependency Injection.

Java comparison

This should look familiar from Java:

interface Logger {
    void log(String message);
}

and:

class ConsoleLogger implements Logger {
    public void log(String message) {
        System.out.println(message);
    }
}

TypeScript syntax is similar.

But there is a major TypeScript difference coming: TypeScript uses structural typing.

We'll explore that through the next exercise rather than just defining it.

Suppose:

interface Logger {
    log(message: string): void;
}

And:

class ConsoleLogger {
    log(message: string): void {
        console.log(message);
    }
}

Notice something:

ConsoleLogger does not say:

implements Logger

Now suppose:

function execute(
    logger: Logger
): void {
    logger.log("Executing tests");
}

Would TypeScript allow this?

const logger = new ConsoleLogger();

execute(logger);

Yes or no? And why do you think so?

This question will introduce one of the biggest differences between Java interfaces and TypeScript interfaces: structural typing.

Yes — your answer is correct, but the reason needs one important refinement.

The important reason is not simply that execute() uses Logger. It's because ConsoleLogger structurally satisfies the Logger interface.

Structural typing

We have:

interface Logger {
    log(message: string): void;
}

And:

class ConsoleLogger {
    log(message: string): void {
        console.log(message);
    }
}

Notice that ConsoleLogger does not say:

implements Logger

Yet this works:

function execute(logger: Logger): void {
    logger.log("Executing tests");
}

const logger = new ConsoleLogger();

execute(logger); // ✅

Why?

TypeScript looks at the shape/structure of ConsoleLogger.

Logger requires:

log(message: string): void

ConsoleLogger provides:

log(message: string): void

Therefore:

Logger requires
       ↓
log(message: string): void
       ↑
ConsoleLogger provides

Structure matches
       ↓
ConsoleLogger is compatible with Logger

This is called structural typing.

Compare with Java

This is a significant difference from Java.

In Java, if:

interface Logger {
    void log(String message);
}

and:

class ConsoleLogger {
    public void log(String message) {
        System.out.println(message);
    }
}

you cannot normally pass ConsoleLogger where Logger is required just because the methods happen to match.

You would explicitly declare:

class ConsoleLogger implements Logger {
    // ...
}

Java primarily uses nominal typing here: the declared relationship matters.

TypeScript asks more like:

Does this value have the structure required by Logger?

Java asks more like:

Has this class declared that it implements Logger?

So:

Java
Declared relationship matters
        ↓
Nominal typing

TypeScript
Compatible structure matters
        ↓
Structural typing
Then why use implements Logger at all?

Good question, because this works without it:

class ConsoleLogger {
    log(message: string): void {
        console.log(message);
    }
}

But writing:

class ConsoleLogger implements Logger {
    log(message: string): void {
        console.log(message);
    }
}

explicitly communicates the design intention:

ConsoleLogger is intentionally designed to satisfy the Logger contract.

It also lets TypeScript immediately check the class against that contract.

For framework code, that can improve readability and make architectural intent clearer.

Now consider:

interface Logger {
    log(message: string): void;
}

class FileLogger {
    log(message: string): void {
        console.log(`Writing to file: ${message}`);
    }

    close(): void {
        console.log("Closing file");
    }
}

And:

function execute(logger: Logger): void {
    logger.log("Executing tests");
}

Will this work?

const logger = new FileLogger();

execute(logger);

FileLogger has the required log() plus an additional close() method.

Do you think TypeScript accepts it or rejects it? Why?

accepts it based on method signature

Correct. TypeScript accepts it because FileLogger has the structure required by Logger.

interface Logger {
    log(message: string): void;
}

FileLogger provides:

log(message: string): void

and the extra method:

close(): void

doesn't make it incompatible.

So this works:

const logger = new FileLogger();

execute(logger); // ✅

The key rule is:

A value is compatible if it has at least the members required by the target type, with compatible signatures.

So conceptually:

Logger requires:
    log(message: string): void

FileLogger provides:
    log(message: string): void
    close(): void

Required contract satisfied
        ↓
Compatible

This is another important consequence of structural typing.

One subtle point: TypeScript can be stricter in some situations with fresh object literals because of excess property checks, but for class instances like this, your reasoning is correct.



                  Logger
             behavioral contract
                    ↑
             ┌──────┴──────┐
             │             │
      ConsoleLogger    FileLogger
             ↑             ↑
             └──────┬──────┘
                    │
                 injected
                    ↓
                ApiClient
                    │
                    ↓
          this.logger.log(...)



The key engineering constraint is:

ApiClient must not know whether it received ConsoleLogger or FileLogger.

interface Logger {
    log(message: string): void;
}

class ConsoleLogger implements Logger {
    log(message: string): void {
        console.log(`[CONSOLE] ${message}`);
    }
}

class FileLogger implements Logger {
    log(message: string): void {
        console.log(`[FILE] ${message}`);
    }
}

class ApiClient {
    constructor(
        public readonly baseUrl: string,
        public readonly timeout: number,
        private readonly logger: Logger
    ) {}

    printConfig(): void {
        this.logger.log(
            `Configuration Details ${this.baseUrl} and ${this.timeout}`
        );
    }
}

const consoleLogger = new ConsoleLogger();

const client1 = new ApiClient(
    "https://api.example.com",
    5000,
    consoleLogger
);

client1.printConfig();

const fileLogger = new FileLogger();

const client2 = new ApiClient(
    "https://api.example.com",
    5000,
    fileLogger
);

client2.printConfig();





Here is a compact summary you can keep as your DI + DIP revision note, using the same Logger example.

Dependency Injection (DI) vs Dependency Inversion Principle (DIP)

The easiest way to distinguish them is:

DI = How does the class receive its dependency?
DIP = What does the class depend on — concrete implementation or abstraction?

Without Dependency Injection

ApiClient creates its own dependency:

interface Logger {
    log(message: string): void;
}

class ConsoleLogger implements Logger {
    log(message: string): void {
        console.log(`[CONSOLE] ${message}`);
    }
}

class ApiClient {
    private readonly logger = new ConsoleLogger();

    printConfig(): void {
        this.logger.log("API configuration");
    }
}

Here:

ApiClient
    ↓ creates
ConsoleLogger

ApiClient decides which logger to create. This creates tight coupling. If we want to change the logging implementation, we may need to modify ApiClient.

Dependency Injection — provide dependency from outside

Instead of ApiClient creating the logger:

class ApiClient {
    constructor(
        private readonly logger: ConsoleLogger
    ) {}

    printConfig(): void {
        this.logger.log("API configuration");
    }
}

We create it outside and inject it:

const logger = new ConsoleLogger();
const client = new ApiClient(logger);

This is Dependency Injection because:

Before:

ApiClient
    ↓
new ConsoleLogger()


After:

Outside
    ↓ creates
ConsoleLogger
    ↓ injects
ApiClient

So:

DI means a class receives its dependency from outside instead of creating the dependency itself.

Constructor injection is one common way to achieve this.

But DI alone doesn't necessarily give us good abstraction

Look carefully at:

constructor(
    private readonly logger: ConsoleLogger
) {}

We are injecting the dependency, so this is DI.

But ApiClient still declares:

ConsoleLogger

as its dependency.

Architecturally:

ApiClient
    ↓ depends on
ConsoleLogger

The class is still coupled to a concrete implementation.

This brings us to DIP.

Dependency Inversion Principle — depend on abstraction

Instead of:

class ApiClient {
    constructor(
        private readonly logger: ConsoleLogger
    ) {}
}

use the interface:

class ApiClient {
    constructor(
        private readonly logger: Logger
    ) {}

    printConfig(): void {
        this.logger.log("API configuration");
    }
}

Now ApiClient says:

"I don't care whether you give me a console logger, file logger, test logger, etc. I only require something that satisfies the Logger contract."

For example:

class ConsoleLogger implements Logger {
    log(message: string): void {
        console.log(`[CONSOLE] ${message}`);
    }
}

class FileLogger implements Logger {
    log(message: string): void {
        console.log(`[FILE] ${message}`);
    }
}

Both can now be injected:

const consoleLogger = new ConsoleLogger();
const client1 = new ApiClient(consoleLogger);

const fileLogger = new FileLogger();
const client2 = new ApiClient(fileLogger);

ApiClient doesn't change.

                 Logger
              abstraction
                  ↑
                  │
              ApiClient

ConsoleLogger ─── satisfies Logger
FileLogger    ─── satisfies Logger
TestLogger    ─── satisfies Logger
Both code differences in one view
// ❌ No DI
// ApiClient creates its own concrete dependency

class ApiClient {
    private readonly logger = new ConsoleLogger();
}

versus:

// ✅ DI, but concrete dependency

class ApiClient {
    constructor(
        private readonly logger: ConsoleLogger
    ) {}
}

const logger = new ConsoleLogger();
const client = new ApiClient(logger);

versus:

// ✅ DI + supports DIP
// Dependency injected AND ApiClient depends on abstraction

class ApiClient {
    constructor(
        private readonly logger: Logger
    ) {}
}

const logger = new ConsoleLogger();
const client = new ApiClient(logger);

The key difference is:

No DI
────────────────────────────────────
private logger = new ConsoleLogger()

Class creates dependency itself.


DI
────────────────────────────────────
constructor(logger: ConsoleLogger)

Dependency comes from outside,
but class still depends on concrete type.


DI + DIP
────────────────────────────────────
constructor(logger: Logger)

Dependency comes from outside
AND class depends on abstraction.
Lead SDET interview answer

Dependency Injection is about how a dependency is provided to a class, while Dependency Inversion is about what the class depends on. With DI, ApiClient receives its logger from outside instead of creating new ConsoleLogger() internally. With DIP, ApiClient depends on the Logger interface rather than ConsoleLogger, allowing ConsoleLogger, FileLogger, or a test implementation to be substituted without changing ApiClient.

One important TypeScript-specific point: Logger is an interface, so you cannot do new Logger(). The interface defines the contract; concrete classes such as ConsoleLogger provide the implementation and can be instantiated.

Lesson 4.7 — Inheritance in TypeScript

Now we'll learn inheritance, but from a Lead SDET/framework-design perspective, not just the extends syntax.

We'll start small with extends and super(). We won't jump into BasePage architecture yet.

4.7.1 What is inheritance?

Inheritance allows one class to acquire properties and behaviors from another class.

Consider API clients where every client needs a baseUrl and timeout.

Without inheritance:

class UserApiClient {
    constructor(
        public readonly baseUrl: string,
        public readonly timeout: number
    ) {}
}

class PaymentApiClient {
    constructor(
        public readonly baseUrl: string,
        public readonly timeout: number
    ) {}
}

We have duplication.

We could introduce:

class BaseApiClient {
    constructor(
        public readonly baseUrl: string,
        public readonly timeout: number
    ) {}
}

Then:

class UserApiClient extends BaseApiClient {
}

extends establishes an inheritance relationship:

BaseApiClient
     ↑
     │ extends
UserApiClient

So this works:

const client = new UserApiClient(
    "https://api.example.com",
    5000
);

console.log(client.baseUrl);
console.log(client.timeout);

Even though UserApiClient doesn't explicitly declare those properties, it inherits them from BaseApiClient.

4.7.2 Think in terms of an "is-a" relationship

A useful design question is:

Is the child genuinely a specialized form of the parent?

For example:

UserApiClient IS AN ApiClient
PaymentApiClient IS AN ApiClient

That can potentially justify inheritance.

But:

ApiClient IS A Logger

doesn't make sense.

An ApiClient uses a Logger.

Therefore this:

class ApiClient extends ConsoleLogger

would usually represent the wrong relationship.

Instead:

class ApiClient {
    constructor(
        private readonly logger: Logger
    ) {}
}

That's composition/dependency injection.

A useful starting distinction is:

IS-A
    → consider inheritance

HAS-A / USES-A
    → consider composition

We'll challenge this rule later because an IS-A relationship alone doesn't automatically mean inheritance is the best architecture.

4.7.3 super()

Suppose the child needs its own configuration too:

class BaseApiClient {
    constructor(
        public readonly baseUrl: string,
        public readonly timeout: number
    ) {}
}

class UserApiClient extends BaseApiClient {
    constructor(
        baseUrl: string,
        timeout: number,
        public readonly userEndpoint: string
    ) {
        super(baseUrl, timeout);
    }
}

What's happening?

The child constructor receives:

baseUrl
timeout
userEndpoint

But baseUrl and timeout belong to the parent.

So:

super(baseUrl, timeout);

calls the parent constructor.

Conceptually:

new UserApiClient(...)
        │
        ▼
UserApiClient constructor
        │
        ├── super(baseUrl, timeout)
        │             │
        │             ▼
        │      BaseApiClient constructor
        │
        └── userEndpoint

Then:

const client = new UserApiClient(
    "https://api.example.com",
    5000,
    "/users"
);

console.log(client.baseUrl);
console.log(client.timeout);
console.log(client.userEndpoint);
Java comparison

This should look familiar:

class UserApiClient extends BaseApiClient {

    UserApiClient(
        String baseUrl,
        int timeout,
        String userEndpoint
    ) {
        super(baseUrl, timeout);
        this.userEndpoint = userEndpoint;
    }
}

The conceptual purpose of extends and super() is similar in TypeScript.

One TypeScript convenience you've already used is parameter properties:

constructor(
    public readonly userEndpoint: string
) {}

That declaration simultaneously creates and initializes the property.

4.7.4 Why super() matters

When a derived class defines a constructor, it must call the base-class constructor before accessing this.

This is invalid:

class UserApiClient extends BaseApiClient {
    constructor(
        baseUrl: string,
        timeout: number,
        public readonly userEndpoint: string
    ) {
        console.log(this.userEndpoint); // ❌
        super(baseUrl, timeout);
    }
}

Correct:

class UserApiClient extends BaseApiClient {
    constructor(
        baseUrl: string,
        timeout: number,
        public readonly userEndpoint: string
    ) {
        super(baseUrl, timeout);

        console.log(this.userEndpoint);
    }
}

Think of super() as establishing the inherited/base portion of the object before the derived class starts working with this.


class PaymentApiClient extends BaseApiClient {
    constructor(
        baseUrl: string,
        timeout: number,
        public readonly paymentEndpoint: string
    ) {
        super(baseUrl, timeout);
    }
}

const paymentClient = new PaymentApiClient(
    "https://api.example.com",
    5000,
    "/payments"
);

paymentClient.printConfig();

console.log(paymentClient.paymentEndpoint);

PaymentApiClient
│
├── baseUrl             ← inherited
├── timeout             ← inherited
├── printConfig()       ← inherited
└── paymentEndpoint     ← child-specific

And:

super(baseUrl, timeout);

passes responsibility for initializing baseUrl and timeout to the parent constructor.

Lesson 4.7.2 — Method Overriding

Currently PaymentApiClient simply inherits printConfig().

paymentClient.printConfig();

uses:

BaseApiClient.printConfig()

But suppose payment clients need additional information:

Base URL: https://api.example.com
Timeout: 5000
Payment Endpoint: /payments

We can override the inherited method.

What is overriding?

The child class provides its own implementation of a method that already exists in the parent:

class PaymentApiClient extends BaseApiClient {

    constructor(
        baseUrl: string,
        timeout: number,
        public readonly paymentEndpoint: string
    ) {
        super(baseUrl, timeout);
    }

    override printConfig(): void {
        console.log(
            `${this.baseUrl} - ${this.timeout} - ${this.paymentEndpoint}`
        );
    }
}

Now:

paymentClient.printConfig();

calls:

PaymentApiClient.printConfig()

instead of:

BaseApiClient.printConfig()

Conceptually:

BaseApiClient
    │
    └── printConfig()
            ↑
            │ overrides
            │
PaymentApiClient
    └── printConfig()
Why use override?

TypeScript can sometimes recognize overriding even without writing the keyword:

printConfig(): void { }

But explicitly writing:

override printConfig(): void { }

communicates:

"I intentionally intend to replace behavior inherited from the parent."

It also helps TypeScript detect mistakes when noImplicitOverride is enabled.

For enterprise QE code, I prefer explicit override because it makes inheritance intent clearer.

Calling the parent implementation with super

Sometimes we don't want to completely replace the parent's behavior.

Suppose the parent already does:

printConfig(): void {
    console.log(`Base URL: ${this.baseUrl}`);
    console.log(`Timeout: ${this.timeout}`);
}

The child only needs to add:

Payment Endpoint

We could duplicate everything:

override printConfig(): void {
    console.log(`Base URL: ${this.baseUrl}`);
    console.log(`Timeout: ${this.timeout}`);
    console.log(`Payment Endpoint: ${this.paymentEndpoint}`);
}

But that duplicates the parent's implementation.

Instead:

override printConfig(): void {
    super.printConfig();

    console.log(
        `Payment Endpoint: ${this.paymentEndpoint}`
    );
}

Here super has two related uses:

super(...)
    → call parent constructor

super.method()
    → call parent method

So:

super(baseUrl, timeout);

and:

super.printConfig();

are different operations.

Why this matters in automation frameworks

You will frequently encounter designs like:

BasePage
   ├── LoginPage
   ├── AccountsPage
   └── PaymentsPage

or:

BaseApiClient
   ├── AccountsApiClient
   └── PaymentsApiClient

A child may inherit common behavior and override specialized behavior.

However, there's a danger.

If every page starts doing:

BasePage
   ↓
AuthenticatedPage
   ↓
PaymentsBasePage
   ↓
InternationalPaymentsPage
   ↓
ScheduledInternationalPaymentsPage

we create deep inheritance.

Then changes to a parent can unexpectedly affect many descendants.

That's why later we'll compare:

Inheritance
    IS-A

vs

Composition
    HAS-A / USES-A

For modern Playwright framework design, inheritance is a tool—not the default architecture.

class PaymentApiClient extends BaseApiClient {
    constructor(
        baseUrl: string,
        timeout: number,
        public readonly paymentEndpoint: string
    ) {
        super(baseUrl, timeout);
    }

    override printConfig(): void {
        super.printConfig();

        console.log(
            `Payment Endpoint: ${this.paymentEndpoint}`
        );
    }
}

Important distinction

You now know two uses of super:

super(baseUrl, timeout);

means:

Call the parent constructor.

While:

super.printConfig();

means:

Call the parent's implementation of printConfig().

And:

override printConfig(): void

means:

The child intentionally provides specialized behavior for an inherited method.

Lesson 4.7.3 — protected in TypeScript

The important difference is:

private   → only this class
protected → this class + subclasses
public    → everyone
2. Why would we need protected?

Consider:

class BaseApiClient {
    constructor(
        private readonly baseUrl: string,
        private readonly timeout: number
    ) {}

    printConfig(): void {
        console.log(
            `${this.baseUrl} - ${this.timeout}`
        );
    }
}

Now suppose:

class PaymentApiClient extends BaseApiClient {
    printPaymentUrl(): void {
        console.log(this.baseUrl); // ❌
    }
}

This doesn't work because:

private readonly baseUrl

means:

Only BaseApiClient itself can access baseUrl.

Even though PaymentApiClient extends BaseApiClient, it cannot directly access a private member.

3. Change it to protected

If subclasses legitimately need the value:

class BaseApiClient {
    constructor(
        protected readonly baseUrl: string,
        protected readonly timeout: number
    ) {}
}

Now:

class PaymentApiClient extends BaseApiClient {
    printPaymentUrl(): void {
        console.log(
            `${this.baseUrl}/payments`
        );
    }
}

works.

Because:

BaseApiClient
│
├── protected baseUrl
├── protected timeout
│
└── PaymentApiClient
        │
        ├── can access baseUrl ✅
        └── can access timeout ✅

But outside code cannot do:

const client = new PaymentApiClient(
    "https://api.example.com",
    5000
);

console.log(client.baseUrl); // ❌

That's the useful part of protected.

The subclass can use the member without exposing it to every caller.

4. protected readonly

Notice we're combining two different concepts:

protected readonly baseUrl: string

Break that apart:

protected
    ↓
WHO can access it?

BaseApiClient + subclasses


readonly
    ↓
CAN it be reassigned?

No

This distinction is important.

For example:

protected baseUrl: string

means subclasses can access and potentially change it.

Whereas:

protected readonly baseUrl: string

means subclasses can access it but cannot reassign it.

For configuration such as baseUrl, the second design is usually safer.

5. private vs protected — don't default everything to protected

A common inheritance mistake is:

"My child class might need it someday, so I'll make everything protected."

That's poor encapsulation.

Start with the narrowest appropriate visibility.

For example:

class BaseApiClient {
    private token: string | undefined;

    constructor(
        protected readonly baseUrl: string
    ) {}
}

Why might this make sense?

baseUrl:

Child API clients may need it
        ↓
protected

But token:

Authentication state should be controlled
by BaseApiClient
        ↓
private

A child shouldn't automatically get access to every internal implementation detail just because it inherits from the class.

6. Better encapsulation can sometimes avoid protected

Suppose we have:

class BaseApiClient {
    constructor(
        private readonly baseUrl: string
    ) {}
}

Instead of exposing baseUrl as protected, the parent could expose meaningful behavior:

protected buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
}

Then:

class PaymentApiClient extends BaseApiClient {
    getPaymentUrl(): string {
        return this.buildUrl("/payments");
    }
}

Notice the difference.

Exposing state
protected readonly baseUrl

allows the child to know about the parent's internal state.

Exposing behavior
protected buildUrl(...)

allows the child to ask the parent to perform an operation.

Often, behavior-based encapsulation gives us a cleaner boundary.

This connects directly to what you learned earlier:

Encapsulation is not merely making fields private; it is about deciding who owns state and behavior.

7. QE framework example

Older Selenium frameworks often contain something like:

class BasePage {
    protected page: Page;
    protected logger: Logger;
    protected config: Config;
    protected timeout: number;
    // many more...
}

Then every page inherits everything:

BasePage
 ├── LoginPage
 ├── HomePage
 ├── PaymentPage
 ├── AccountPage
 └── TransferPage

It may initially look reusable.

But eventually BasePage can become a dumping ground containing dozens of protected members and utility methods.

Then every child knows too much about the base class.

That's one reason we'll eventually ask:

Should this really be inheritance, or would composition be cleaner?

We'll get there after establishing the OOP mechanics.

Lesson 4.7.4 — Abstract Classes

We now have a BaseApiClient. This raises an architectural question:

Should somebody be allowed to create new BaseApiClient(...), or should it exist only as a foundation for specialized API clients?

If the answer is "it should only be a base for other clients", an abstract class can express that rule.

1. What is an abstract class?

Consider:

abstract class BaseApiClient {
    constructor(
        protected readonly baseUrl: string,
        protected readonly timeout: number
    ) {}

    printConfig(): void {
        console.log(
            `${this.baseUrl} - ${this.timeout}`
        );
    }
}

Now this is prohibited:

const client = new BaseApiClient(
    "https://api.example.com",
    5000
); // ❌ Cannot create an instance of an abstract class

But inheritance is allowed:

class PaymentApiClient extends BaseApiClient {
}

and:

const client = new PaymentApiClient(
    "https://api.example.com",
    5000
); // ✅

So:

Normal class
    → can instantiate
    → can extend

Abstract class
    → cannot instantiate directly
    → can extend
2. Abstract classes can contain implemented behavior

This is important.

An abstract class does not mean every method must be abstract.

For example:

abstract class BaseApiClient {
    constructor(
        protected readonly baseUrl: string,
        protected readonly timeout: number
    ) {}

    printConfig(): void {
        console.log(
            `${this.baseUrl} - ${this.timeout}`
        );
    }
}

printConfig() already has an implementation.

Every child can inherit it:

class PaymentApiClient extends BaseApiClient {
}

This gives us:

BaseApiClient
    │
    ├── common state
    │      baseUrl
    │      timeout
    │
    └── common implemented behavior
           printConfig()

PaymentApiClient
    ↑ inherits them
3. Abstract methods

Now suppose every API client must provide an endpoint, but the base class cannot know what that endpoint should be.

For example:

PaymentApiClient → /payments
UserApiClient    → /users
AccountApiClient → /accounts

We could define the requirement:

abstract class BaseApiClient {
    constructor(
        protected readonly baseUrl: string
    ) {}

    abstract getEndpoint(): string;
}

Notice:

abstract getEndpoint(): string;

has no implementation.

The base class says:

Every concrete subclass must provide this behavior.

Therefore:

class PaymentApiClient extends BaseApiClient {
}

would fail because PaymentApiClient hasn't implemented getEndpoint().

It needs:

class PaymentApiClient extends BaseApiClient {
    getEndpoint(): string {
        return "/payments";
    }
}

And another subclass can provide different behavior:

class UserApiClient extends BaseApiClient {
    getEndpoint(): string {
        return "/users";
    }
}
4. Abstract class = common implementation + required specialization

This is the useful mental model:

abstract class BaseApiClient
│
├── "Here is behavior I already implement"
│       printConfig()
│
└── "Here is behavior YOU must implement"
        getEndpoint()

So an abstract class can contain both:

abstract class BaseApiClient {

    printConfig(): void {
        // concrete implementation
    }

    abstract getEndpoint(): string;
}
5. Interface vs abstract class

You already learned:

interface Logger {
    log(message: string): void;
}

Now you might reasonably ask:

Why not make everything an interface?

There is an important difference.

An interface primarily defines a contract:

interface Logger {
    log(message: string): void;
}

It says what capability an implementation must provide.

An abstract class can provide both shared implementation/state and requirements for subclasses:

abstract class BaseApiClient {
    constructor(
        protected readonly baseUrl: string
    ) {}

    buildUrl(endpoint: string): string {
        return `${this.baseUrl}${endpoint}`;
    }

    abstract getEndpoint(): string;
}

So at this stage, use this mental model:

Interface	Abstract class
Defines a contract	Base implementation + contract
No instance state	Can contain state
No constructor	Can have constructor
Class implements it	Class extends it
Multiple interfaces can be implemented	Class extends one base class

For example:

class PaymentApiClient
    extends BaseApiClient
    implements Logger {
}

A class can implement multiple interfaces but extends only one class.

We'll avoid combining these unnecessarily until there is a real design reason.

6. Java comparison

The concept should be familiar from Java:

abstract class BaseApiClient {

    abstract String getEndpoint();

}

TypeScript:

abstract class BaseApiClient {
    abstract getEndpoint(): string;
}

But don't conclude:

"Java framework has BasePage, therefore TypeScript Playwright framework should also have BasePage."

That's exactly the architectural assumption we'll challenge later.

const client = new PaymentApiClient(
    "https://api.example.com"
);

console.log(client.buildUrl());

client.buildUrl()
      │
      ▼
BaseApiClient.buildUrl()
      │
      │ this.baseUrl
      │       +
      │ this.getEndpoint()
      │
      ▼
PaymentApiClient.getEndpoint()
      │
      ▼
"/payments"
      │
      ▼
https://api.example.com/payments