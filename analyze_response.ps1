$json = Get-Content 'C:\Users\s.stoyanov\source\repos\github.com\SStoyanov22\gto-poker\gto_wizard_response_flop.json' -Raw | ConvertFrom-Json

Write-Host "=== TOP LEVEL KEYS ==="
$json.PSObject.Properties.Name
Write-Host ""

Write-Host "=== ACTION_SOLUTIONS COUNT ==="
$json.action_solutions.Count
Write-Host ""

Write-Host "=== ACTIONS AVAILABLE ==="
$json.action_solutions | ForEach-Object {
    $freq = [math]::Round($_.total_frequency * 100, 1)
    Write-Host "$($_.action.type) $($_.action.betsize) - freq: $freq%"
}
Write-Host ""

Write-Host "=== STRATEGY ARRAY LENGTH (first action) ==="
$json.action_solutions[0].strategy.Count
Write-Host ""

Write-Host "=== OTHER FIELDS ==="
if ($json.ev) { Write-Host "EV: $($json.ev)" }
if ($json.hands) { Write-Host "Hands count: $($json.hands.Count)" }
if ($json.board) { Write-Host "Board: $($json.board)" }
if ($json.position) { Write-Host "Position: $($json.position)" }
