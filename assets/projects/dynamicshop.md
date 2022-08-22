---
title: "DynamicShop"
description: "A Spigot-based Minecraft server plugin that features a global item shop with fluctuating prices based on supply and demand"
date: "2021/12/12"
written: "August 21, 2022"
edited: "August 21, 2022"
status: "Completed"
haslink: true
link: "https://github.com/tareqalyousef/DynamicShop"
---
### Intro 
This is a server plugin for the game [Minecraft](https://en.wikipedia.org/wiki/Minecraft) (Java edition) that allows players to interact with a global item market through chat commands. Every item has a buy and sell price, every player has a balance, and there's a leaderboard showing all current player balances&mdash;though these features are pretty standard. The twist is that every item has a configurable exponential curve that its price follows based on how many have been bought and sold, creating an economy based on supply and demand. Players can also view the market's highest and lowest percent changes in price to see if there's an opportunity to make money or to avoid buying certain artificially scarce items.

I developed it with a friend specifically for our group's survival multiplayer server, and it worked well and was a pretty fun enhancement to the Vanilla Minecraft experience. You can check out the [repository](https://github.com/tareqalyousef/DynamicShop) for implementation details and even add it to your own server if you want to try it out.

In this post, I'll showcase some commands and talk about interesting strategies we discovered to earn money, which was ultimately based on our somewhat arbitrary default pricing and a *bit* of oversight, but all items settled to their true value eventually, so I'd say it worked as intended.

<figure class='text-center'>
  <img src='/images/dynamic-shop/dynamic-shop-5.png' class='mx-auto'/>
  <figcaption>My search for netherite had adverse effects on netherrack and quartz holders.</figcaption>
</figure>

### What is a plugin?
Servers hosted with [Spigot](https://www.spigotmc.org/) contain modified server files that allow for the use of plugins, additions to the game without changing the game itself (unlike a mod). A plugin is typically a new system that stores information that can interact with the players or world and maybe adds some commands to allow players to interact back. Similar to browser extensions.

### DynamicShop at work
This is the list of commands:

```yml
buy:
  description: Buy an item from the global shop.
  usage: /buy <item> <amount>
sell:
  description: Sell an item to the global shop.
  usage: /sell <item> [<amount> | all]
balance:
  aliases: [bal]
  description: Check your balance.
  usage: /balance, /bal
leaderboard:
  aliases: [baltop]
  description: Check the highest balances on the server.
  usage: /leaderboard, /baltop
price:
  description: Check the price of an item.
  usage: /price <item>
highest:
  description: Check highest item percentage changes.
  usage: /highest
lowest:
  description: Check lowest item percentage changes.
  usage: /lowest
quote:
  description: Quote a price for buying or selling a quantity of an item.
  usage: /quote [buy | sell] <item> [<amount> | all]
```

Below I have provided the commands typed to produce the output in the screenshot.

<hr>

```c
/price diamond
/sell diamond 200
/sell diamond 2000 (Note: this will still sell as many as you have, up to this amount)
```

<figure class='text-center'>
  <img src='/images/dynamic-shop/dynamic-shop-1.png' class='mx-auto'/>
  <figcaption>A quick limit test.</figcaption>
</figure>

<hr>

```c
/quote sell stone all
/sell stone all
[refill inventory]
/sell stone all
[refill inventory]
/sell stone all
/price stone
/lowest
```

<figure class='text-center'>
  <img src='/images/dynamic-shop/dynamic-shop-2.png' class='mx-auto'/>
  <figcaption></figcaption>
</figure>

<hr>

```c
/buy arrow 64
/price totem_of_undying
/quote sell totem_of_undying all
/sell saddle all
/baltop
```

<figure class='text-center'>
  <img src='/images/dynamic-shop/dynamic-shop-4.png' class='mx-auto'/>
  <figcaption>Always on top.</figcaption>
</figure>

<hr>

### Finding breakthroughs in the market
Now what's a free market without exploitation? When using this plugin for ourselves, we discovered both some flaws in the pricing system and more creative opportunities to get rich quick.

<figure class='text-center'>
  <img src='/images/dynamic-shop/dynamic-shop-3.png' class='mx-auto'/>
  <figcaption>Something is going on in the rotten flesh market...</figcaption>
</figure>

<hr>

In the early game, the most expensive items that players could immediately acquire were certain colored dyes. You could find a field of flowers that crafted light gray dye and start going ham, leaving your bank account with many *tens* of dollars by the end of it. This meant you could at least buy some good food to get through the first nights or start saving up.

Sheep farming was also a very easy way to earn money since you can obtain wool without killing the sheep, so it's easier to grow the population. Starting at $30 each (by our default prices), the first player to break into the wool market would be able to make quite a bit. Also, since each wool color had its own separate price, you could buy dyes to combine with the wool to basically bring the value back up to $30 and sell that. Since there was now a demand for the dyes, their prices were brought back up, and the players still out picking flowers would earn a lot more too by helping the wool sellers keep the price down, leveling the playing field in a way. Isn't that cool?

<hr>

Now this was the biggest flaw: prices of items directly proportional to each other in crafting were completely separate. The best example is the new copper ore, since it was really easy to get a lot of and was good for nothing but selling.

###### defaults.yml
```yml
RAW_COPPER: 4.0
RAW_COPPER_BLOCK: 36.0
COPPER_ORE: 24.0
DEEPSLATE_COPPER_ORE: 24.0
COPPER_INGOT: 16.0
COPPER_BLOCK: 144.0
```

You can get around 2–5 units of raw copper per copper ore mined. Smelting raw copper yields more expensive copper ingots. A copper block is 9 ingots, so it's 9 times the price. Makes sense.

However, since each of these items were independently priced, once the prices began changing from the defaults, there was an imbalance. Copper ingots were being sold so much that their value was low enough for players to make money by *buying* 9 copper ingots, crafting a copper block for free, and selling the *block* back at 85% market value. You can see where this is going.

In the screenshot above, note that we had mined **so much copper** that we were too lazy to even exploit the system anymore and just started selling the raw copper.

<hr>

Finally, a more legitimate trick that I actually discovered. Cleric villagers buy 32 rotten flesh for 1 emerald, which is only good for trading with other villagers, but that's not a bad deal. This plugin introduced a new market for emeralds&mdash;one where they were worth $256. Since rotten flesh was only valued at $2 by default, this was the perfect arbitrage opportunity. You could buy a ton of rotten flesh and trade it to the cleric each day for up to 4 times the value until it stopped turning a profit. Genius. As a side effect, killing zombies was worth something.

<hr>

### Conclusion
My friend and I might build upon the plugin in the future and address these issues, but they were fun to abuse, and I almost feel like it contributed in a good way to the overall experience, perhaps remaining as a reward to those who find them.