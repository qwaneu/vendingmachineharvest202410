export enum Choice {
  Cola = "Cola Choice",
  FizzyOrange = "Fizzy orange choice",
  Beer = "Beer Choice"
}

export enum Can {
  Nothing = "No can at all",
  Coke = "Can of Coke",
  Fanta = "Can of Fanta"
}

export class VendingMachine {
  _choices : Map<Choice, Can> = new Map();
  _prices : Map<Choice, number> = new Map();
  _credits: number = 0;
  
  deliver(choice: Choice) : Can {
    if (!this._choices.has(choice)) return Can.Nothing;

    if (this._credits >= this._prices.get(choice)!) {
      this._credits -= this._prices.get(choice)!;
      return this._choices.get(choice)!;
    }

    return Can.Nothing;
  }

  configureChoice(choice: Choice, canToDeliver: Can, priceInCents: number = 0) {
    this._choices.set(choice, canToDeliver);
    this._prices.set(choice, priceInCents);
  }

  insert(amount: number) {
    this._credits += amount;
  }
}
