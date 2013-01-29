# punch – fix-utf8 generator hook

This generator hook will help you fix broken encoding when you generated some non HTML text file (i.e. xml, json…).

## Use-case

I've met this case when trying to generate a `rss.xml` file using a content-handler, [there's an issue for that](https://github.com/laktek/punch/issues/62) but here is a "user-land" fix.

This concerns every file generated from content handlers and not having `.html` extension, as `punch` will use `binary` encoding in those cases, and writing text with this encoding will result in `iso-8859-1` files (your call, Node).

## Installation

```
npm install punch-fix-utf8
```

## Usage

In your `config.json`:

```json
{
	"plugins": {
		"generator_hooks": {
			"fix_utf8": "./fix-utf8-hook"
		}
	},
	"utf8_paths": [
		"/path/to/file.xml"
	]
}
```

Just provide in `utf8_paths` the list of paths that should be re-encoded using `utf8` encoding instead of `binary`.

## How does it work?

This will simply `fs.writeFile(…, fs.readFile(…, 'binary'), 'utf8')`.

To avoid re-encoding to UTF-8 each time you regenerate your pages (which would break your files, again) a `.fix-utf8.done` file is kept in your output directory. If file is updated, it will be fixed again. If you remove output and generate again, it will be fixed. If you just regenerate and file is not touched, it won't be re-encoded.
