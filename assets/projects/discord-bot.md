---
title: "s4mple Bot"
description: "My own Discord bot with a bunch of random commands and features"
date: "2017/12/30"
written: "August 18, 2022"
edited: "August 21, 2022"
status: "Completed"
haslink: false
link: ""
---
### Intro
My very first personal project. How exciting!

This was a Discord bot created in late 2017 using [Discord4J](https://discord4j.com/) 2.9.3, a Java wrapper for the official Discord Bot API. At the time, I was in 10th grade&mdash;halfway through my "AP Computer Science A" course with nothing but basic Java skills and a dream.

> **Note:** Sadly, this bot is no longer publicly available since I host it locally and have to constantly be running the program to keep it online.

### What is Discord?
[Discord](https://en.wikipedia.org/wiki/Discord) is a social platform released in 2015 that was becoming increasingly popular due to its unique take on organized communication and variety of free services. You can create a collection of chat and voice channels called a server and invite other users to form an online community. Interestingly, servers would be able to make use of user-developed bot accounts to grant the ability to execute custom commands or automate aspects of a server such as authentication and moderation.

### How do bots work?
Once you request and receive an API token, you can start a bot and invite it to your server. Bots have some form of event handlers that listen to anything it can pick up in direct messages or server channels it has access to&mdash;messages, reactions, even users joining and speaking in a voice channel&mdash;and allow them to respond however you can program it. Every user, server, and channel has a unique id, so you can add custom functionality to very specific events as well.

### It's alive!
Discord4J provided a helpful tutorial on setting up basic functionality in [IntelliJ](https://www.jetbrains.com/idea/). It was surprisingly easy to set up, and, with as little experience as I had, I was able to get an instance of a Discord client configured and running.

<figure class='text-center'>
  <img src='/images/discord-bot/discord-bot-6.png' class='mx-auto'/>
  <figcaption>A celebration of a Discord bot rite of passage.</figcaption>
</figure>

> **Note:** There are a lot of longer code blocks in this post simply because I'm not making the whole project public, so feel free to skip these. They are intended to provide a bit of insight about a bot's inner-workings and show generally what the syntax is like, but it's quite outdated now and honestly boring to read through unless you're genuinely interested.

This is the heart of the bot:
###### BotUtils.java
```java
// Handles the creation and getting of a IDiscordClient object for a token
static IDiscordClient getBuiltDiscordClient(String token) {
    // The ClientBuilder object is where you will attach your params for configuring the instance of your bot.
    // Such as withToken, setDaemon etc
    return new ClientBuilder()
            .withToken(token)
            .withRecommendedShardCount()
            .build();

}

// Helper functions to make certain aspects of the bot easier to use.
static void sendMessage(IChannel channel, String message) {
    RequestBuffer.request(() -> {
        try {
            channel.sendMessage(message);
        } catch(DiscordException e) {
            System.out.println("Message (" + message + ") from " + channel.getName() + " in " + channel.getGuild().getName() + " could not be sent with error: ");
            e.printStackTrace();
        }
    });
}
```
###### MainRunner.java
```java
public static void main(String[] args) {
    args = new String[1];
    args[0] = "MY API TOKEN";

    IDiscordClient cli = BotUtils.getBuiltDiscordClient(args[0]);

    cli.getDispatcher().registerListener(new CommandHandler());
    cli.login();
}
```

Then it was on to commands containing actual arguments.

Below you can see the program structure and get a general idea for how commands are executed. An `@EventSubscriber` receives a type of event and handles it from there. In this case, receiving messages, the message's contents are split into an argument array for parsing. I had also implemented the option to change the command prefix, including the ability for it to contain whitespace. This file is essentially the brains of the bot and contains most of the logic for responses. Since this is pretty old, the code quality may be questionable, so please don't judge me:
###### CommandHandler.java
```java
@EventSubscriber
public void onMessageReceived(MessageReceivedEvent event) {
    try {
        ...
        // Given a message "/test arg1 arg2", argArray will contain ["/test", "arg1", "arg2"]
        String argArray[];
        if(!BotUtils.BOT_PREFIX.contains(" "))
            argArray = event.getMessage().getContent().split(" ");
        // Given a message "okay google test arg1 arg2", argArray will contain ["okay google test", "arg1", "arg2"] (if "okay google " is the prefix)
        else if(event.getMessage().getContent().startsWith(BotUtils.BOT_PREFIX)) {
            argArray = event.getMessage().getContent().substring(BotUtils.BOT_PREFIX.length()).split(" ");
            String[] newArray = Arrays.copyOf(argArray, argArray.length);
            newArray[0] = BotUtils.BOT_PREFIX + argArray[0];
            for(int i = 1; i < newArray.length; i++) {
                newArray[i] = argArray[i];
            }

            argArray = newArray;
        } else {
            argArray = event.getMessage().getContent().split(" ");
        }

        // Check if the first arg (the command) starts with the prefix defined in the utils class
        if(!argArray[0].startsWith(BotUtils.BOT_PREFIX))
            return;
        
        // Extract the "command" part of the first arg out by just ditching the prefix
        String commandStr = argArray[0].substring(BotUtils.BOT_PREFIX.length());

        // Load the rest of the args in the array into a List for safer access
        List<String> argsList = new ArrayList<>(Arrays.asList(argArray));
        argsList.remove(0); // Remove the command

        // Begin the switch to handle the string to command mappings. It's likely wise to pass the whole event or
        // some part (IChannel) to the command handling it
        switch(commandStr) {
            case "test":
                test(event, argsList);
                break;
            case "ping":
                ping(event);
                break;
        }
        ...
    }
    ...
}

@EventSubscriber
public void onVoiceInputReceived(UserSpeakingEvent event) { ... }

private void test(MessageReceivedEvent event, List<String> args) {
    BotUtils.sendMessage(event.getChannel(), "args: " + args);
}

private void ping(MessageReceivedEvent event) {
    BotUtils.sendMessage(event.getChannel(), "Pong!");
}
```

<figure class='text-center'>
  <img src='/images/discord-bot/discord-bot-1.png' class='mx-auto'/>
  <figcaption>No problem.</figcaption>
</figure>

### Some more implementation details and examples
Before I added more commands, I was interested in allowing each server to set its *own* command prefix since it was still being done globally. To do this, I had to create a hashmap of server ids to serializable `ServerSettings` objects and stored a serialized copy of the map as a local file. Every time I restarted the bot, it needed to load the saved settings back in, and before each message event was handled, the server-specific settings were pulled from the map:
###### MainRunner.java
```java
public static void main(String[] args) {
    // Loading settings from serversettings.txt
    try {
        HashMap<String, ServerSettings> object = (HashMap<String, ServerSettings>) Serialization.deSerialization(
                "C:\\Users\\brandan\\path\\to\\serversettings.txt");
        CommandHandler.settings = object;
        System.out.println(CommandHandler.getSettings());
    } catch(IOException | ClassNotFoundException e) {
        e.printStackTrace();
    }

    args = new String[1];
    ...
}
```
###### CommandHandler.java
```java
@EventSubscriber
public void onMessageReceived(MessageReceivedEvent event) {
    try {
        // If the server isn't in serversettings.txt, add it with default settings
        if(!settings.containsKey(event.getGuild().getStringID()))
            settings.put(event.getGuild().getStringID(), new ServerSettings("/"));

        // Loads in server settings for the event
        BotUtils.BOT_PREFIX = settings.get(event.getGuild().getStringID()).getPrefix();
        ...
        // Serialization to update settings right after a command
        try {
            Serialization.serialization("C:\\Users\\brandan\\path\\to\\serversettings.txt", settings);
            // System.out.println("!\n" + CommandHandler.getSettings() + "!");
        } catch(IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
    ...
}

...

private void setPrefix(MessageReceivedEvent event, List<String> args) {
    if(event.getAuthor().equals(event.getGuild().getOwner()) || event.getAuthor().getStringID().equalsIgnoreCase("217070114254618626")) {
        if(args.size() == 1) {
            settings.replace(event.getGuild().getStringID(), new ServerSettings(args.get(0)));
            BotUtils.sendMessage(event.getChannel(), "Prefix has been set to \"" + args.get(0) + "\"");
        }
        else if(args.size() > 1) {
            String newPrefix = "";
            for(String arg : args) {
                newPrefix += arg + " ";
            }

            settings.replace(event.getGuild().getStringID(), new ServerSettings(newPrefix));
            BotUtils.sendMessage(event.getChannel(), "Prefix has been set to \"" + newPrefix + "\"");
        }
        else {
            BotUtils.sendMessage(event.getChannel(), "Please enter a prefix.");
        }
    }
    else {
        BotUtils.sendMessage(event.getChannel(), "You don't have the power to do that.");
    }
}
```

You get the idea. Here's the full list commands that were made public:
* `/help` - PMs you this list of commands
* `/ping` - Pong!
* `/8ball` - Answers yes or no questions with a randomly selected response
* `/coinflip` - Flips a coin
* `/prefix` - Changes the prefix (usable by server owners only; use with any character, word(s), or phrase(s) (it can be almost anything))
* `resetprefix` - Resets the prefix (useable by server owners only)
* `/colorrgb` - Gives the color and its hexadecimal value given the R G B values (use with three integers between 0 and 255 inclusive * separated by a space)
* `/colorhex` - Gives the color and its R B G values given the hexadecimal value (use with a hexadecimal value with a length of 6)
* `/google` - Returns the first 1000 characters of a Google search (use with anything you would usually type into Google)

<figure class='text-center'>
  <img src='/images/discord-bot/discord-bot-2.png' class='mx-auto'/>
  <figcaption></figcaption>
</figure>

Additionally, I had a "fun" system, where the bot had a chance to automatically respond to messages containing certain keywords without being explicitly commanded to, giving it a sort of personality. I used the server settings file to keep track of each servers' preferences, and this could be configured using these commands:
* `/disablefun` - Sets the bot to not autorespond regardless of fun level (useable by server owners only)
* `/enablefun` - Allows the bot to autorespond (useable by server owners only)
* `/fun` - Sets the fun level (usable by server owners only; use with a number between 0 and 1 inclusive, which will be the chance of the bot autoresponding)
* `/funlevel` - Returns the fun level

Here's an example:
###### CommandHandler.java
```java
@EventSubscriber
public void onMessageReceived(MessageReceivedEvent event) {
    try {
        ...
        // Autoresponse
        if(fun) {
            double random = (int) (Math.random() * (1 / funLevel)) + 1;

            if(random == 1 / funLevel) {
                ...
                // @s4mple Bot check
                int atCheck = 0;
                for(String name : argArray) {
                    if(name.contains("<@396595556492771339>")) {
                        atCheck++;
                        break;
                    }
                }
                if(atCheck > 0)
                    goAway(event);
                ...
            }
        }
        ...
    }
    ...
}

...

private void goAway(MessageReceivedEvent event) {
    int random = (int)(Math.random() * 6) + 1;
    if(random == 1)
        BotUtils.sendMessage(event.getChannel(), "leave me alone");
    if(random == 2)
        BotUtils.sendMessage(event.getChannel(), "go away");
    if(random == 3)
        BotUtils.sendMessage(event.getChannel(), "what do you want?");
    if(random == 4)
        BotUtils.sendMessage(event.getChannel(), "how do you like it when i do it to you, huh? " + event.getAuthor().mention());
    if(random == 5)
        BotUtils.sendMessage(event.getChannel(), "that wasn't very nice");
    if(random == 6)
        BotUtils.sendMessage(event.getChannel(), "stop it");
}
```

<figure class='text-center'>
  <img src='/images/discord-bot/discord-bot-7.png' class='mx-auto'/>
  <figcaption></figcaption>
</figure>

I was particularly proud of these two commands where I was messing around with embed colors:
###### CommandHandler.java
```java
private void colorRGB(MessageReceivedEvent event, List<String> args) {
    try {
        int r = Integer.parseInt(args.get(0));
        int g = Integer.parseInt(args.get(1));
        int b = Integer.parseInt(args.get(2));

        EmbedBuilder builder = new EmbedBuilder();
        builder.withColor(r, g, b);
        builder.withAuthorName("<- This is color rgb(" + r + ", " + g + ", " + b + ")");
        builder.withDescription("Hexadecimal: #" + (Integer.toHexString(r) + Integer.toHexString(g) + Integer.toHexString(b)).toUpperCase());
        event.getChannel().sendMessage(builder.build());
    } catch (Exception e) {
        BotUtils.sendMessage(event.getChannel(), "Please enter three integers between 0 and 255 inclusive (R, G, B).");
        throw e;
    }
}

private void colorHex(MessageReceivedEvent event, List<String> args) {
    try {
        int r, g, b;
        EmbedBuilder builder = new EmbedBuilder();
        String hex = args.get(0);
        if(hex.startsWith("#")) {
            r = Integer.parseInt(hex.substring(1, 3), 16);
            g = Integer.parseInt(hex.substring(3, 5), 16);
            b = Integer.parseInt(hex.substring(5), 16);
            builder.withAuthorName("<- This is color " + hex.toUpperCase());
        } else {
            r = Integer.parseInt(hex.substring(0, 2), 16);
            g = Integer.parseInt(hex.substring(2, 4), 16);
            b = Integer.parseInt(hex.substring(4), 16);
            builder.withAuthorName("<- This is color #" + hex.toUpperCase());
        }
        builder.withColor(r, g, b);
        builder.withDescription("R G B: (" + r + ", " + g + ", " + b + ")");
        event.getChannel().sendMessage(builder.build());
    } catch (Exception e) {
        BotUtils.sendMessage(event.getChannel(), "Please enter a hexadecimal number with a length of 6.");
        throw e;
    }
}
```
<figure class='text-center'>
  <img src='/images/discord-bot/discord-bot-3.png' class='mx-auto'/>
  <figcaption></figcaption>
</figure>

One private experimental feature was the ability to join a voice channel and play a local sound file (either on command or automatically whenever a specific user was talking using a [`UserSpeakingEvent`*](https://javadoc.io/static/com.discord4j/Discord4J/2.10.1/sx/blah/discord/handle/impl/events/guild/voice/user/UserSpeakingEvent.html)) as a prank:
###### CommandHandler.java
```java
@EventSubscriber
public void onVoiceInputReceived(UserSpeakingEvent event) {
    String targetID = "217070114254618626";
    if(event.getUser().getStringID().equals("396595556492771339")) { // bot's ID
        botIsSpeaking = event.isSpeaking();
    }
    if(event.getUser().getStringID().equals(targetID))  { // target's ID
        targetIsSpeaking = event.isSpeaking();
    }
    if(!botIsSpeaking && targetIsSpeaking) {
        PlaySound.play(event, "sound_effect");
        // System.out.println("speak now");
    }
}
```
###### PlaySound.java
```java
public static void play(UserSpeakingEvent event, String searchStr) {
    IVoiceChannel userVoiceChannel = event.getUser().getVoiceStateForGuild(event.getGuild()).getChannel();
    if(userVoiceChannel == null)
        return;
    userVoiceChannel.join();

    AudioPlayer ap = AudioPlayer.getAudioPlayerForGuild(event.getGuild());

    // Find a song given the search term
    File[] songs = new File("C:\\Users\\brandan\\path\\to\\music")
            .listFiles(file -> file.getName().contains(searchStr));

    if(songs == null || songs.length == 0)
        return;

    ap.clear();
    try {
        ap.queue(songs[0]);
    } catch(IOException | UnsupportedAudioFileException e) {
        e.printStackTrace();
    }
}
```

### Conclusion
Now what I had was *nothing* compared to the amazing things people had done at the time. There were already bots that could play music from multiple platforms, scrape web pages and display the information, and even simulate full-on interactive games in chat, and Discord and its dedicated bot developer community continue to invent new ways to use them. However, in the end, it was still a lot of fun to create and was a great learning experience to reflect upon.

<figure class='text-center'>
  <img src='/images/discord-bot/discord-bot-5.png' class='mx-auto'/>
  <figcaption>s4mple Bot's final message.</figcaption>
</figure>