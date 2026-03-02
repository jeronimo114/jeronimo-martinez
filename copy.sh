#!/bin/bash
# Script para copiar cada página al clipboard una por una
# Uso: bash copy.sh

BASE="/Users/jero/Downloads/Programacion/esic-redesign"

FILES=(
  "index.html|HOME"
  "master-definitiva/index.html|MASTER (general)"
  "master/digital-business-elementor.html|MASTER · Digital Business"
  "master/customer-experience-elementor.html|MASTER · Customer Experience"
  "master/digital-marketing-elementor.html|MASTER · Digital Marketing"
  "pregrado/digital-business-elementor.html|PREGRADO · Digital Business"
  "pregrado/marketing-global-elementor.html|PREGRADO · Marketing Global"
  "pregrado/becas-elementor.html|PREGRADO · Becas"
  "pages/programas-elementor.html|PROGRAMAS"
  "level-up/level-up-elementor.html|LEVEL UP"
  "institucional/quienes-somos-elementor.html|QUIÉNES SOMOS"
  "executive-programs/elementor-widget.html|EXECUTIVE PROGRAMS"
)

TOTAL=${#FILES[@]}

for i in "${!FILES[@]}"; do
  IFS='|' read -r path label <<< "${FILES[$i]}"
  NUM=$((i + 1))

  echo ""
  echo "─────────────────────────────────────────"
  echo "  [$NUM/$TOTAL] $label"
  echo "  $path"
  echo "─────────────────────────────────────────"

  if [ ! -f "$BASE/$path" ]; then
    echo "  ⚠️  Archivo no encontrado, saltando..."
    continue
  fi

  pbcopy < "$BASE/$path"
  echo "  ✅ Copiado al clipboard"
  echo ""

  if [ "$NUM" -lt "$TOTAL" ]; then
    read -p "  Presiona ENTER para continuar con el siguiente →" _
  fi
done

echo ""
echo "═════════════════════════════════════════"
echo "  ✅ Todas las páginas copiadas ($TOTAL/$TOTAL)"
echo "═════════════════════════════════════════"
echo ""
