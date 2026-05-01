# API Testing with Playwright

This is demo/sample code for API Testing ideas using Playwright.

It is partially a complement to a Tech Talk I gave on the topic on April 2026. The main goal is to present a way to organize the code, use a Service Object, and offer three common ways in which automated checks can be done with API.

I use the Star Wars API as the "Service Provider" since it is reliable, easy to use and understand, and requires no key. Obviously, these are all read-only endpoints.

> [!NOTE]
> In many places, the code could be simplified, squashed, or expressed in a single line. I kept it "verbose" for clarity.

## Test Check "Patterns"

- Isolated Tests. Endpoints are checked in isolation.
    Simplest and most direct way to assert the data of the response and status of a request.

- Sequence of Tests. Various endpoints are checked in sequence, each as its own test.
    There is a dependency among them so that the output of one can be (part of) the input of the next. This allows us to check for workflows, interactions, and relationships among the services.

- Sequence of API. Each test calls various endpoints to achieve a specific outcome, task, or workflow.

At the end of the day, the last two can be mixed and help with automating workflows, End to End, interactions, and relationships. It's about "organizing the code", more than anything, and keeping with the model we have built in our mind after testing as we code the checks.

In my most recent product/project I have used the last two the most, usually in combination. A Sequence of Tests that themselves can contain a Sequence of API. This way the asserts can check more than just returned data, but (some of) the business logic that the workflows are creating.

The SWAPI is very simple, I have tried to reflect what each "pattern" can offer in the best possible way.

> [!NOTE]
> These are ideas I have used on how to go about API Testing. If nothing else, they can be a source of inspiration, or a first step to see if they also work with your services.

## Notes

- I have left most of the standard structure from Playwright untouched, since it is good enough for the purposes of this sample code.
- The SwapiService class becomes the Service Object used in the test files. Here I keep state, useful data, and the endpoint processing methods.
- The ApiUtils class has a generic JSON Schema check method that I use for an assert.
- The LogUtils class is a first idea to create a single point where to handle useful messaging to the console for debugging, or communication purposes.

## The API Used

I use the Star Wars API as the "service". SWAPI(info).
