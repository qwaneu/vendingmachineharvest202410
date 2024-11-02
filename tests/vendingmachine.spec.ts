"use strict";

enum Choice {
  Cola = "Cola Choice",
  FizzyOrange = "Fizzy orange choice",
  Beer = "Beer Choice"
}

enum Can {
  Nothing = "No can at all",
  Coke = "Can of Coke",
  Fanta = "Can of Fanta"
}

class VendingMachine {
  _choices : Map<Choice, Can> = new Map();
  _priceInCents: number = 0;
  _credits: number = 0;
  
  deliver(choice: Choice) : Can {
    if (!this._choices.has(choice)) return Can.Nothing;

    if (this._credits >= this._priceInCents) {
      return this._choices.get(choice)!;
    }

    return Can.Nothing;
  }

  configureChoice(choice: Choice, canToDeliver: Can, priceInCents: number = 0) {
    this._choices.set(choice, canToDeliver);
    this._priceInCents = priceInCents;
  }

  insert(amount: number) {
    this._credits = amount;
  }
}

describe("Vending machine", () => {
  let machine: VendingMachine;
  
  beforeEach(() => {
    machine = new VendingMachine();
    machine.configureChoice(Choice.FizzyOrange, Can.Fanta);
    machine.configureChoice(Choice.Cola, Can.Coke);
  });

  it("delivers noting on non existing choice", () => {
    expect(machine.deliver(Choice.Beer)).toEqual(Can.Nothing);
  });

  it("delivers can of Coke when choosing cola", () => {
    expect(machine.deliver(Choice.Cola)).toEqual(Can.Coke);
  });

  it("delivers can of Fanta when choosing Fizzy Orange", () => {
    expect(machine.deliver(Choice.FizzyOrange)).toEqual(Can.Fanta);
  });

  describe("when priced", () => {
    beforeEach(() => {
      machine.configureChoice(Choice.FizzyOrange, Can.Fanta, 100);
    });

    it("delivers nothing when not paid", () => {
      expect(machine.deliver(Choice.FizzyOrange)).toEqual(Can.Nothing);
    });

    it("delivers when paid enough", () => {
      machine.insert(100);
      expect(machine.deliver(Choice.FizzyOrange)).toEqual(Can.Fanta);
    });

    it("delivers when paid too much", () => {
      machine.insert(200);
      expect(machine.deliver(Choice.FizzyOrange)).toEqual(Can.Fanta);
    });
  });
});
