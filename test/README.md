# Link to repo of pattern list

List of patterns to learn
<https://github.com/tshemsedinov/Patterns-JavaScript?tab=readme-ov-file>

## Creational patterns

### Abstract Factory. Definition

- [ ] [Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory/typescript/example) -
      Abstract Factory defines an interface for creating all distinct products but leaves the actual product creation to concrete factory classes. Each factory type corresponds to a certain product variety.
      The client code calls the creation methods of a factory object instead of creating products directly with a constructor call (new operator). Since a factory corresponds to a single product variant, all its products will be compatible.

Client code works with factories and products only through their abstract interfaces. This lets the client code work with any product variants, created by the factory object. You just create a new concrete factory class and pass it to the client code.

### Abstract Factory. Check out example in [here](./patterns/creational/abstract-factory.ts)


### Builder. Definition

- [ ] [Builder](https://refactoring.guru/design-patterns/builder/typescript/example) -
  Builder is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using the same construction code.

### Check out example in [here](./patterns/creational/builder.ts)


## Behavorial patterns

### Strategy. Definition

- [ ] [Strategy](https://refactoring.guru/design-patterns/strategy/typescript/example) -
  Strategy is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.

### Check out example in [here](./patterns/behavorial/strategy.ts)



### Command. Definition

- [ ] [Command](https://www.patterns.dev/vanilla/command-pattern/) -
    With the Command Pattern, we can decouple objects that execute a certain task from the object that calls the method.


### Check out example in [here](./patterns/behavorial/command.ts)










### Builder. Definition

- [ ] [Builder](https://refactoring.guru/design-patterns/builder/typescript/example) -
  Builder is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using the same construction code.

### Check out example in [here](`./patterns/creational/builder.ts`)
