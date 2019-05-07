# Bang Browser Extension
## What is Bang?
> This is a project that was inspired by [DuckDuckGo's Bang Feature](https://duckduckgo.com/bang). If you want the experience of this extension, but at the same time a private search history, I'd recommend to use DuckDuckGo as your primary search engine. _(By the way, if you are an Employee at DuckDuckGo and disagree with this open-source project, please let me know)_

Bang is a shortcut parser for your URL Bar. __But instead of explaining it it boring words, let's look at some examples.__

#### Just open pages
- What you type into the URL Bar: `!w`
- Which URL is going to be opened: `https://en.wikipedia.org/`
- Purpose: Open Wikipedia

---
#### Search on that page
- What you type into the URL Bar: `!a Elon Musk Books`
- Which URL is going to be opened: `https://amazon.com/s?k=Elon+Musk+Books`
- Purpose: Search Books on Amazon regarding Elon Musk

<br/>

- What you type into the URL Bar: `!gmail label: Important`
- Which URL is going to be opened: `https://mail.google.com/mail/#search/label%3A+Important`
- Purpose: Search your Gmail Account for all Emails that have the label "Important"

---
#### Language and Domain specification
Well, in the first example, I said that `en.wiki ..` will be opened. That was actually not quite correct. Instead of hard-coding a Language or Domain variable, they are flexible and you can set them to whatever you want. [See Options for more Information](#options)

So, what is really going to be opened: `https://{your_preset_language}.wikipedia.org/` <br/>
Or, in the second example: `https://amazon.{your_preset_tld}/...`

You can also define a language or TLD tags directly in the URL bar. The direct input weighs more than the settings.

- What you type into the URL Bar: `!a-de Elon Musk Books`
- Which URL is going to be opened: `https://amazon.de/s?k=Elon+Musk+Books`
- Purpose: Overwrite the preset `.com` domain to `.de`


## How many and which shortcuts are available?
Currently, the amount of shortcuts which are included in this project is nowhere near the amount that DuckDuckGo provides (over 12.000). _**But you can help to increase the amount of supported shortcuts.**_. [See more at: How to add a Shortcut](#Contributing-shortcuts)


## Contributing shortcuts
Have you been on your favorite website like again and noticed that there is no shortcut for it? Well you can add it in less than one minute. 

1. Fork this repository
2. Open [./extension/src/commands/commands.json](extension/src/commands/commands.json)
3. Make sure the entry does not exist already. Search for the name and URL of the website you want to add, first!
4. Add your entry to the `cmds` array. Formatted like: 
```js
{
  "cmd": "!YOUR_COMMAND", // The command with an exclamation mark in front of it. e.g. "!a" (required)
  "name": "MyWebsite Name", // The Name of the Website. e.g. "Amazon". Do not enter .com or any other TLD (required)
  "target": "https://mywebsite.com", // The Default URL to redirect to if no search term is provided (required)
  "target_s": "https://mywebsite.com/search?q={{q}}" // The Search URL string (optional)
}

```
Variables/Placeholders:
1. __`{{tld}}`__
>  - If your URL contains a TLD (top-level-domain) that differs by location e.g. `amazon.com` and `amazon.co.uk`, make sure you replace the TLD string with this placeholder. For instance, `https://amazon.com` becomes `https://amazon.{{tld}}`.

2. __`{{lang}}`__
> - The same procedures as with `{{tld}}`. For instance, Wikipedia has a static TLD (`.org`) but differs in it's subdomain. They use language tags like `en` or `fr` in there. That's what will be inserted by `{{lang}}`. Example: `https://en.wikipedia.org` becomes `https://{{lang}}.wikipedia.org`.

Care! Just use {{tld}} __OR__ {{lang}} in one string.

3. __`{{q}}`__
> The search query placeholder. Place it at the position where the search goes. Example: `https://google.com/search?q={{q}}`, because if you search for e.g. `shoes`, the search term looks like `https://google.com/search?q=shoes`. Understood?

## Options
As mentioned above, you can easily change and update your _Language Settings_, as well as your _Default TLD_. Those will be inserted inside the `{{tld}}` or `{{lang}}` placeholders in the URL string. Defaults are `com` for TLD and `en` for language.

### Steps:
1. Left-click on the icon of this extension in the upper right-hand corner of your Browser. 
2. Select the `'Options'` menu item 
3. Insert your preferences into the input field
4. Hit confirm and close the window
