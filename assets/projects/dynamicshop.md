---
title: "DynamicShop"
description: "A Spigot-based Minecraft server plugin that features a global item shop with fluctuating prices based on supply and demand"
date: "2021/12/12"
written: "Never"
edited: "Never"
status: "Completed"
haslink: true
link: "https://github.com/tareqalyousef/DynamicShop"
---
This post is in progress.
<hr>
This is a server plugin for Minecraft that allows players to interact with a global item market through chat commands. Every item has a buy and sell price, every player has a balance, and there's even a leaderboard showing all current player balances, though this is all pretty standard. The twist is that every item has this exponential curve that its price follows based on how many have been bought and sold, creating an economy based on supply and demand. Players can list the highest or lowest percent changes in price in the market to see if there’s an opportunity to make money or to avoid buying certain artificially scarce items, and it's been working very well.

following (code) this formula, calculate the whole thing using a predetermined average rate