# Bang Browser Extension

## What is Bang?

> This is a project that was inspired by [DuckDuckGo's Bang Feature](https://duckduckgo.com/bang). If you want the experience of this extension, but at the same time a private search history, I'd recommend to use DuckDuckGo as your primary search engine. _(By the way, if you are an Employee at DuckDuckGo and disagree with this open-source project, please let me know)_

Bang is a shortcut parser for your URL Bar. **But instead of explaining it it boring words, let's look at some examples.**

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

# More information in the [wiki](https://github.com/eykrehbein/bang/wiki/Installation)
