import { Container, inject, injectable, multiInject } from "inversify";
import "reflect-metadata";

@injectable()
class Top {
    constructor(
        @multiInject("multi-inject") private multis: Object[],
        @inject("circle-1") private circle1: Circle1,
    ) { }
}

@injectable()
class Circle1 {
    constructor(
        @inject("circle-2") private circle2: Circle2,
    ) { }
}

@injectable()
class Circle2 {
    constructor(
        @inject("circle-1") private circle1: Circle1,
    ) { }
}

@injectable() class Multi1 { }
@injectable() class Multi2 { }
@injectable() class Multi3 { }

const container = new Container();
container.bind("multi-inject").to(Multi1);
container.bind("multi-inject").to(Multi2);
container.bind("multi-inject").to(Multi3);
container.bind("circle-1").to(Circle1);
container.bind("circle-2").to(Circle2);
container.bind(Top).toSelf();

container.get(Top);
