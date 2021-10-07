---
title: Adobe Developer — SDK Developer Kit | PDF Library | Dynamic PDF Document Generation
description: Own the end-to-end customer experience. Our SDK Developer kits are customizable & built to last. Find an innovative solution with our PDF SDK here.
---


<TextBlock slots="heading, buttons, text" theme="lightest"/>

##### Dynamic PDF Document Generation

- [See documentation](/src/pages/gettingstarted.md)

Merge your JSON data with custom Word templates to generate high-fidelity PDF and Word documents

<CodeBlock slots="heading, code" repeat="2" languages=".net,java" />

#### .Net

```c#
// Create an ExecutionContext using credentials.
ExecutionContext executionContext = ExecutionContext.Create(credentials);

// Setup input data for the document merge process
var content = File.ReadAllText(@"salesOrder.json");
JObject jsonDataForMerge = JObject.Parse(content);

// Create a new DocumentMerge Options instance
DocumentMergeOptions documentMergeOptions = new DocumentMergeOptions(jsonDataForMerge, OutputFormat.PDF);

// Create a new DocumentMerge Operation instance with the DocumentMerge Options instance
DocumentMergeOperation documentMergeOperation = DocumentMergeOperation.CreateNew(documentMergeOptions);

// Set the operation input document template from a source file.
documentMergeOperation.SetInput(FileRef.CreateFromLocalFile(@"salesOrderTemplate.docx"));

// Execute the operation.
FileRef result = documentMergeOperation.Execute(executionContext);

// Save the result to the specified location
result.SaveAs(Directory.GetCurrentDirectory() + "/output/salesOrderOutput.pdf");
```

#### Java

```java
// Setup input data for the document merge process
String content = new String(Files.readAllBytes(Paths.get("src/main/resources/salesOrder.json")));
JSONObject jsonDataForMerge = new JSONObject(content);

// Create an ExecutionContext using credentials.
ExecutionContext executionContext = ExecutionContext.create(credentials);

//Create a new DocumentMergeOptions instance
DocumentMergeOptions documentMergeOptions = new DocumentMergeOptions(jsonDataForMerge, OutputFormat.PDF);

// Create a new DocumentMergeOperation instance with the DocumentMergeOptions instance
DocumentMergeOperation documentMergeOperation = DocumentMergeOperation.createNew(documentMergeOptions);

// Set the operation input document template from a source file.
FileRef documentTemplate = FileRef.createFromLocalFile("src/main/resources/salesOrderTemplate.docx");
documentMergeOperation.setInput(documentTemplate);

// Execute the operation
FileRef result = documentMergeOperation.execute(executionContext);

// Save the result to the specified location.
result.saveAs("output/salesOrderOutput.pdf");
```