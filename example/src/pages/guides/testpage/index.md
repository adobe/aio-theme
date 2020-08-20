# Storage

<a name="module-storage-entry" id="module-storage-entry"></a>

### storage.Entry
An `Entry` is the base class for `File` and `Folder`. You'll
never instantiate an `Entry` directly, but it provides
the common fields and methods that both `File` and `Folder`
share.

Inline code blocks like auth tokens `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` should wrap lines to stay inside content area.

> **Info**
>
> Important:
>
> * An Entry object may exist even if the corresponding file/folder on disk does not
>   currently exist.
> * It's possible for multiple Entry objects to represent the same item on disk,
>   for example if the item was picked via multiple separate file picker invocations.

**Kind**: static class of [`storage`](#module-storage)
**Since**: XD 13

* [.Entry](#module-storage-entry)
    * [.name](#module-storage-entry-name) : `string`
    * [.provider](#module-storage-entry-provider) : `FileSystemProvider`
    * [.url](#module-storage-entry-url) : `URL`
    * [.nativePath](#module-storage-entry-nativepath) : `string`
    * [.isEntry](#module-storage-entry-isentry) : `boolean`
    * [.isFile](#module-storage-entry-isfile) : `boolean`
    * [.isFolder](#module-storage-entry-isfolder) : `boolean`
    * [.toString()](#module-storage-entry-tostring) ⇒ `string`
    * [.copyTo(folder, options)](#module-storage-entry-copyto) ⇒ `Promise`
    * [.moveTo(folder, options)](#module-storage-entry-moveto) ⇒ `Promise`
    * [.delete()](#module-storage-entry-delete) ⇒ `Promise`
    * [.getMetadata()](#module-storage-entry-getmetadata) ⇒ `Promise.<EntryMetadata>`

<JsDocParameters/>

<a name="module-storage-entry-name" id="module-storage-entry-name"></a>

#### entry.name : `string`
The name of this entry. Read-only.

**Kind**: instance property of [`Entry`](#module-storage-entry)
**Read only**: true
**Since**: XD 13
**Example**
```js
console.log(anEntry.name);
```

<a name="module-storage-entry-provider" id="module-storage-entry-provider"></a>

#### entry.provider : `FileSystemProvider`
The associated provider that services this entry. Read-only.

**Kind**: instance property of [`Entry`](#module-storage-entry)
**Read only**: true
**Since**: XD 13
**Example**
```js
if (entryOne.provider !== entryTwo.provider) {
    throw new Error("Providers are not the same");
}
```
