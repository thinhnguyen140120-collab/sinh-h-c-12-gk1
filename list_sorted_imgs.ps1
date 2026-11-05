# Let's inspect the images in sequence as they appear in the PDF
# Because PDF objects are usually in page order!
$dir = "C:\Users\Admin\.gemini\antigravity\scratch\on-tap-sinh-12\images"
$files = Get-ChildItem "$dir\pdf_img_*.jpg" | Sort-Object { [int]($_.BaseName -replace '\D') }
foreach ($f in $files) {
    Write-Output "$($f.Name): $($f.Length) bytes"
}
