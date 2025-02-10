from pathlib import Path

import nbformat
from nbconvert import MarkdownExporter
from nbconvert.preprocessors import ExecutePreprocessor
from nbconvert.writers.files import FilesWriter


def export_notebook_as_html(contents, output_file, output_dir):
    """
    Exports a Jupyter notebook to HTML using a custom Jinja template,
    executes all code cells, and saves the corresponding output media
    to a dedicated folder.

    Parameters:
    - notebook_path: str, path to the .ipynb file to export.
    - output_path: str, where to save the output HTML file.
    - template_path: str, path to the directory containing the custom Jinja template.
    - output_dir: str, path to the directory to save output media files.
    """

    notebook_content = nbformat.reads(contents, as_version=4)

    exporter = MarkdownExporter()

    (body, resources) = exporter.from_notebook_node(notebook_content)

    with open("templates/loading.html") as f:
        pretext = f.read()
    with open(Path(output_dir) / output_file, "w", encoding="utf-8") as f:
        f.write(pretext)
        f.write(body)

    ep = ExecutePreprocessor(timeout=1800, kernel_name="python3")
    ep.preprocess(notebook_content, {"metadata": {"path": output_dir}})

    (body, resources) = exporter.from_notebook_node(notebook_content)

    with open("templates/index.html") as f:
        pretext = f.read()
    with open(Path(output_dir) / output_file, "w", encoding="utf-8") as f:
        f.write(pretext)
        f.write(body)

    writer = FilesWriter()
    writer.build_directory = str(output_dir)
    writer.write(body, resources, notebook_name="temp")

    with open(Path(output_dir) / "success.txt", "w") as f:
        f.write("done\n")

    print(f"Notebook has been successfully exported as Markdown to {output_file}")
    print(f"Output media files have been saved to {output_dir}")


notebook_path = "/home/kush/mbook-backend/test.ipynb"
output_file = "index.html"
output_dir = "/home/kush/mbook-backend/op"
