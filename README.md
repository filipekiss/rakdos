# Rakdos

![Latest Release](https://img.shields.io/github/release/filipekiss/rakdos.svg)

---

Rakdos is a Telegram bot to search Scryfall for Magic: The Gathering cards.

## About Rakdos

Rakdos can either be added to groups or be used in
[inline mode](https://telegram.org/blog/inline-bots).

#### Searching for a card (Inline Mode)

When using Rakdos as an inline bot, in any chat, just type `@RakdosBot` followed
by your query. Let's say you're looking for "Teferi":

![Rakdos Bot - Inline Searching for "Teferi"](https://user-images.githubusercontent.com/48519/45177894-9aa88880-b1ea-11e8-8530-0b90dc0007f6.png)

All found cards (limited to 50 results) will be shown. Just tap the card you
want (say,
[Teferi, Hero of Dominaria](https://scryfall.com/card/dom/207/teferi-hero-of-dominaria))
and the result will be sent to the chat:

![Teferi sent by Rakdos](https://user-images.githubusercontent.com/48519/45313594-b91dc500-b505-11e8-820d-669edfa7a969.png)

#### Using Rakdos in a group chat (Trigger mode)

If you want, you can add Rakdos to any group you have to make it easier to talk
about M:tG. For example, let's say I discussing the latest GP and I wanna talk
about this cool combo I've seen using Teferi and Glimmer of Genius:

![Rakdos in group chat](https://user-images.githubusercontent.com/48519/45313785-377a6700-b506-11e8-8488-c4b019c6bdb0.png)

All the cards are sent in a single message. Just click any of the cards and
you're able to see it full size:

![Full Size Glimmer of Genius](https://user-images.githubusercontent.com/48519/45313794-3ba68480-b506-11e8-88cf-3426a3673327.png)

Rakdos takes full advantage of the excellent [Scryfall](https://scryfall.com)
API, so you don't even need to type the full card name. Just enough to
unambiguously identify the card (In the example above I used `[[Teferi Hero]]`
instead of the full name). If you spell something wrong or if you're not
specific enough, Rakdos will place a 404 card among your results. Click the 404
card to see which card Rakdos wasn't able to find (check the image caption) and
try using a more specific name:

!["Flimmer" miss typed](https://user-images.githubusercontent.com/48519/45314031-09e1ed80-b507-11e8-8c59-28366957bacb.png)

#### Dual faced cards

Dual-faced cards like
[Nicol Bolas, the Ravager // Nicol Bolas, the Arisen](https://scryfall.com/card/m19/218/nicol-bolas-the-ravager-nicol-bolas-the-arisen)
will always be shown as two results. If you're using Rakdos in a group and used
the brackets trigger to search for the card, both faces will be sent as an
answer (The transformed version will always come second, regardless your search
term):

![Nicol Bolas and it's two faces](https://user-images.githubusercontent.com/48519/45314198-7bba3700-b507-11e8-8abb-b826e05ce6ad.png)

If you're using the inline search, they will be shown as separate results:

![Nicol Bolas in Inline Mode](https://user-images.githubusercontent.com/48519/45314252-9db3b980-b507-11e8-8256-87dcf436c620.png)

After you picked you poison and sent out the face you want, if the card is able
to transform, a button will be shown allowing you to transform the card in
place, without the need to search for the other face:

![Transform Button](https://user-images.githubusercontent.com/48519/45314427-10249980-b508-11e8-9a99-f6ec94a5d2f6.png)

Just click/tap the button and the card will be updated. You can see a working
gif
[here](https://user-images.githubusercontent.com/48519/45313272-c8504300-b504-11e8-8ad8-dd6f01350aa8.gif)

#### Search modifiers

Rakdos support a couple of search modifiers:

###### `#` - Card Legalities (Standard, Modern and Legacy)

###### `$` - Card Price (USD, EUR and TIX)

These modifiers are supported on both inline mode and trigger mode:

##### Using modifiers in inline mode

Just make your search normally, but prepend the card name with one of the
symbols above.

###### `$` - Card Price (USD, EUR and TIX)

###### `@RakdosBot $Rishadan Port`

<img width="365" alt="image" src="https://user-images.githubusercontent.com/48519/45570713-0b2e5580-b83a-11e8-943d-233e80ed56aa.png">

###### `#` - Card Legality (Standard, Modern and Legacy)

###### `@RakdosBot #Abrupt Decay`

<img width="336" alt="image" src="https://user-images.githubusercontent.com/48519/45570723-171a1780-b83a-11e8-92a3-de6ccc81251e.png">

##### Using modifiers in trigger mode

Just like inline mode, just prepend you card name using one of the symbols (`#`
or `$`).

###### `$` - Card Price (USD, EUR and TIX)

###### `[[$Rishadan Port]]`

<img width="333" alt="image" src="https://user-images.githubusercontent.com/48519/45571201-e3d88800-b83b-11e8-930b-d9cbf6de034f.png">

###### `#` - Card Legality (Standard, Modern and Legacy)

###### `[[#Abrupt Decay]]`

<img width="302" alt="image" src="https://user-images.githubusercontent.com/48519/45571217-ec30c300-b83b-11e8-92d8-31d04d33597f.png">

You can even combine multiple modifiers in the same message (the bot will
responde in separate messages, though):

<img width="642" alt="image" src="https://user-images.githubusercontent.com/48519/45571444-94df2280-b83c-11e8-9668-ddaeeacace85.png">

### Problems with cards and other suggestions

If you have any issues regarding the bot's functionality, feel free to
[open an issue](https://github.com/filipekiss/rakdos/issues/new/choose). I'll
look into it as soon as possible.

### Donations

If you like the bot and would like to support my work, you can tip me via
Paypal! Just click the button below:

[![Donate Via Paypal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UXALPPNXG2MB4)

**rakdos** © 2018+, Filipe Kiss Released under the [MIT] License.<br> Authored
and maintained by Filipe Kiss.

> GitHub [@filipekiss](https://github.com/filipekiss) &nbsp;&middot;&nbsp;
> Twitter [@filipekiss](https://twitter.com/filipekiss)

[mit]: http://mit-license.org/
[typescript]: https://typescriptlang.org
[`next` branch]: https://github.com/filipekiss/rakdos/tree/next
