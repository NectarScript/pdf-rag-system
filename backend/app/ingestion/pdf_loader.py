from haystack.nodes import PDFToTextConverter

def load_pdf(pdf_path):
    converter = PDFToTextConverter()
    document = converter.convert(file_path=pdf_path, meta=None)
    return document
