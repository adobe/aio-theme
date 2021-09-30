---
title: Adobe Developer — SDK Developer Kit | PDF Library | PDF Content Structure
description: Own the end-to-end customer experience. Our SDK Developer kits are customizable & built to last. Find an innovative solution with our PDF SDK here.
---

<TextBlock slots="heading, buttons, text" theme="light"/>

##### Extract PDF Content & Structure

- [See documentation](/src/pages/gettingstarted.md)

Extract content from scanned and native PDFs to use for database insertion, content republishing, RPA, and more


<CodeBlock slots="heading, code" repeat="2" languages="js,python" />

#### Node.js

```js
// Create an ExecutionContext using credentials
const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

// Create a new operation instance.
const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew(),
  input = PDFServicesSdk.FileRef.createFromLocalFile(
    'resources/extractPDFInput.pdf',
    PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
  );

// Set operation input from a source file.
extractPDFOperation.setInput(input);

// Build and set extractPDF options
const options = new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
  .addElementsToExtract(
    PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT)
  .addElementsToExtractRenditions(
    PDFServicesSdk.ExtractPDF.options.ExtractRenditionsElementType.FIGURES)
  .addCharInfo(true)
  .build()
extractPDFOperation.setOptions(options);

// Execute the operation and Save the result to the specified location.
extractPDFOperation.execute(executionContext)
  .then(result => result.saveAsFile('output/extractPdf.zip'))
```

#### Python

```python
#Create an ExecutionContext using credentials and create a new operation instance.
execution_context = ExecutionContext.create(credentials)
extract_pdf_operation = ExtractPDFOperation.create_new()

#Set operation input from a source file.
source = FileRef.create_from_local_file(base_path + "/resources/extractPdfInput.pdf")
extract_pdf_operation.set_input(source)

# Build ExtractPDF options and set them into the operation
extract_pdf_options: ExtractPDFOptions = ExtractPDFOptions.builder() \
  .with_elements_to_extract([PDFElementType.TEXT, PDFElementType.TABLES]) \
  .with_elements_to_extract_renditions([PDFElementType.TABLES, PDFElementType.FIGURES]) \
  .with_get_char_info(True) \
  .build()
extract_pdf_operation.set_options(extract_pdf_options)

#Execute the operation.
result: FileRef = extract_pdf_operation.execute(execution_context)

# Save the result to the specified location.
result.save_as(base_path + "/output/extractPdf.zip")
```