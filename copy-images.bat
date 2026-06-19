@echo off
echo Copying placeholder images to assets/images...

set SRC=C:\Users\KATANA GF66\.gemini\antigravity\brain\0ffda544-0931-487a-8770-eca516930dea
set DST=d:\Chalvin\PROJECTS\rekaruang\assets\images

copy /Y "%SRC%\hero_bg_1781880718312.png" "%DST%\hero-bg.png" && echo [OK] hero-bg.png
copy /Y "%SRC%\tile_concrete_grey_1781880730842.png" "%DST%\tile-concrete-grey.png" && echo [OK] tile-concrete-grey.png
copy /Y "%SRC%\tile_earth_brown_1781880745600.png" "%DST%\tile-earth-brown.png" && echo [OK] tile-earth-brown.png
copy /Y "%SRC%\tile_sage_green_1781880760300.png" "%DST%\tile-sage-green.png" && echo [OK] tile-sage-green.png
copy /Y "%SRC%\tile_ochre_1781880776797.png" "%DST%\tile-ochre.png" && echo [OK] tile-ochre.png
copy /Y "%SRC%\tile_charcoal_dark_1781880876763.png" "%DST%\tile-charcoal.png" && echo [OK] tile-charcoal.png
copy /Y "%SRC%\tile_charcoal_1781880862451.png" "%DST%\tile-texture-detail.png" && echo [OK] tile-texture-detail.png
copy /Y "%SRC%\project_cafe_1781880790066.png" "%DST%\project-cafe.png" && echo [OK] project-cafe.png
copy /Y "%SRC%\project_office_1781880802205.png" "%DST%\project-office.png" && echo [OK] project-office.png
copy /Y "%SRC%\project_residence_1781880818314.png" "%DST%\project-residence.png" && echo [OK] project-residence.png
copy /Y "%SRC%\project_retail_1781880833357.png" "%DST%\project-retail.png" && echo [OK] project-retail.png
copy /Y "%SRC%\about_workshop_1781880848664.png" "%DST%\about-workshop.png" && echo [OK] about-workshop.png

echo.
echo === All 12 images copied! ===
pause
