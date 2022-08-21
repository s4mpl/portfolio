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
This post is in progress

<hr>

### Intro 
This is a server plugin for the game [Minecraft](https://en.wikipedia.org/wiki/Minecraft) that allows players to interact with a global item market through chat commands. Every item has a buy and sell price, every player has a balance, and there's a leaderboard showing all current player balances&mdash;though these features are pretty standard. The twist is that every item has a configurable exponential curve that its price follows based on how many have been bought and sold, creating an economy based on supply and demand. Players can also view the market's highest and lowest percent changes in price to see if there's an opportunity to make money or to avoid buying certain artificially scarce items.

I developed it with a friend specifically for our group's survival multiplayer server, and it worked well and was a pretty fun enhancement to the Vanilla Minecraft experience. You can check out [the code](https://github.com/tareqalyousef/DynamicShop) and even add it to your own server if you want to try it out.

In this post, I'll briefly explain the commands and their implementation and then talk about interesting strategies we discovered to earn money, which was ultimately based on our somewhat arbitrary default pricing and a *bit* of oversight, but all items settled to their true value eventually, and players will always find a way to break something anyway.

### What is a plugin?
Servers hosted with [Spigot](https://www.spigotmc.org/) contain modified server files that allow for the use of plugins, additions to the game without changing the game itself (unlike a mod). A plugin is typically a new system that stores information that can interact with the players or world and maybe adds some commands to allow players to interact back. Similar to browser extensions.

### Some implementation details
text

###### src/plugin.yml
```yml
commands:
  buy:
    description: Buy an item from the global shop.
  sell:
    description: Sell an item to the global shop.
  balance:
    aliases: [bal]
    description: Check your balance.
  leaderboard:
    aliases: [baltop]
    description: Check the highest balances on the server.
  price:
    description: Check the price of an item.
  highest:
    description: Check highest item percentage changes.
  lowest:
    description: Check lowest item percentage changes.
  quote:
    description: Quote a price for buying or selling a quantity of an item.
```

You can configure roughly how the curves behave by updating the starting prices and rates `(1 + BASE_RATE) * (DEFAULT_PRICE)^(GROWTH_RATE)`
###### Settings.java
```java
public class Settings {
    public static final double SALES_TAX = 0.85;
    public static final double BASE_RATE = 0.0007;
    public static final double GROWTH_RATE = 0.225;
    public static final int MAX_QUANTITY_RATIO = 8;

    public static final String DATA_PATH = getServer().getWorldContainer() + "/plugins/DynamicShop";
    public static final String BALANCES_PATH = DATA_PATH + "/balances.yml";
    public static final String DEFAULT_PRICES_PATH = DATA_PATH + "/defaults.yml";
    public static final String CURRENT_PRICES_PATH = DATA_PATH + "/prices.yml";
    public static final String ALIASES_PATH = DATA_PATH + "/aliases.yml";

    public static final ChatColor PREFIX_COLOR = ChatColor.BLUE;
    public static final ChatColor DEFAULT_COLOR = ChatColor.GRAY;
    public static final ChatColor HIGHLIGHT_COLOR = ChatColor.GOLD;
    public static final ChatColor MONEY_COLOR = ChatColor.GREEN;
}
```

following (code) this formula, calculate the whole thing using a predetermined average rate

provide example chats like `/sell stone 109`

<figure class='text-center'>
  <img src='/images/dynamic-shop/dynamic-shop-1.png' class='mx-auto'/>
  <figcaption>A quick limit test.</figcaption>
</figure>

<figure class='text-center'>
  <img src='/images/dynamic-shop/dynamic-shop-2.png' class='mx-auto'/>
  <figcaption></figcaption>
</figure>

<figure class='text-center'>
  <img src='/images/dynamic-shop/dynamic-shop-4.png' class='mx-auto'/>
  <figcaption>Always on top.</figcaption>
</figure>

<figure class='text-center'>
  <img src='/images/dynamic-shop/dynamic-shop-5.png' class='mx-auto'/>
  <figcaption>My search for netherite has adverse effects on netherrack and quartz holders.</figcaption>
</figure>

### Finding breakthroughs in the market
arbitrage:
rotten flesh exploit market since emeralds were almost useless in-game but were valuable in the global market
rotten flesh: 2.0, emerald: 256. 32 rotten flesh -> 1 emerald = 4x value

get flowers and sell dyes for early game money -> then they dye settled because no one needed the money anymore and they now were slightly cheaper to buy now. almost like a global inventory: if people contribute enough, it's cheaper for everyone

since ore and blocks were of different types, you could make money selling copper ingots then a burst of extra off copper blocks (could still craft 1 block for 9) until all the value was gone then same for raw copper and all the other ores

<figure class='text-center'>
  <img src='/images/dynamic-shop/dynamic-shop-3.png' class='mx-auto'/>
  <figcaption>Something is going on in the rotten flesh market...</figcaption>
</figure>