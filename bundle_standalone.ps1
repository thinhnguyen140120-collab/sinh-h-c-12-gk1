$baseDir = if ($PSScriptRoot) { $PSScriptRoot } else { "c:\Users\Admin\Downloads\sinh học12 gk1 (2026-2027)\web sinh học 12 gk1 update2" }

$indexHtml = [System.IO.File]::ReadAllText("$baseDir\index.html", [System.Text.Encoding]::UTF8)

# Read all JS files
$diagrams = [System.IO.File]::ReadAllText("$baseDir\diagrams.js", [System.Text.Encoding]::UTF8)
$l1 = [System.IO.File]::ReadAllText("$baseDir\data_lesson1.js", [System.Text.Encoding]::UTF8)
$l2 = [System.IO.File]::ReadAllText("$baseDir\data_lesson2.js", [System.Text.Encoding]::UTF8)
$l3 = [System.IO.File]::ReadAllText("$baseDir\data_lesson3.js", [System.Text.Encoding]::UTF8)
$l4 = [System.IO.File]::ReadAllText("$baseDir\data_lesson4.js", [System.Text.Encoding]::UTF8)
$l5 = [System.IO.File]::ReadAllText("$baseDir\data_lesson5.js", [System.Text.Encoding]::UTF8)
$data = [System.IO.File]::ReadAllText("$baseDir\data.js", [System.Text.Encoding]::UTF8)
$app = [System.IO.File]::ReadAllText("$baseDir\app.js", [System.Text.Encoding]::UTF8)

# Regex replace the external script tags with inline scripts
$scriptsBlock = @"
    <script>
        $diagrams
    </script>
    <script>
        $l1
    </script>
    <script>
        $l2
    </script>
    <script>
        $l3
    </script>
    <script>
        $l4
    </script>
    <script>
        $l5
    </script>
    <script>
        $data
    </script>
    <script>
        $app
    </script>
"@

$pattern = '(?s)<script src="diagrams\.js"></script>.*?<script src="app\.js"></script>'
$newHtml = [regex]::Replace($indexHtml, $pattern, $scriptsBlock)

[System.IO.File]::WriteAllText("$baseDir\standalone.html", $newHtml, [System.Text.Encoding]::UTF8)
Write-Output "Successfully built standalone.html! File size: $( (Get-Item "$baseDir\standalone.html").Length ) bytes."
