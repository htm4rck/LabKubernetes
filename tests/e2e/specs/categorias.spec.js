const { test, expect } = require('@playwright/test');

test.describe('Gestión de Categorías', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe mostrar la lista de categorías', async ({ page }) => {
    await page.click('text=Categorías');
    await expect(page.locator('h2')).toContainText('Categorías');
    await expect(page.locator('[data-testid="categorias-list"]')).toBeVisible();
  });

  test('debe crear una nueva categoría', async ({ page }) => {
    await page.click('text=Categorías');
    await page.click('[data-testid="btn-nueva-categoria"]');
    
    await page.fill('[data-testid="input-nombre"]', 'Categoría Test');
    await page.fill('[data-testid="input-descripcion"]', 'Descripción de prueba');
    
    await page.click('[data-testid="btn-guardar"]');
    
    await expect(page.locator('text=Categoría Test')).toBeVisible();
  });

  test('debe editar una categoría existente', async ({ page }) => {
    await page.click('text=Categorías');
    await page.click('[data-testid="btn-editar"]:first-child');
    
    await page.fill('[data-testid="input-nombre"]', 'Categoría Editada');
    await page.click('[data-testid="btn-guardar"]');
    
    await expect(page.locator('text=Categoría Editada')).toBeVisible();
  });

  test('debe eliminar una categoría', async ({ page }) => {
    await page.click('text=Categorías');
    
    const initialCount = await page.locator('[data-testid="categoria-item"]').count();
    
    await page.click('[data-testid="btn-eliminar"]:first-child');
    await page.click('[data-testid="btn-confirmar-eliminar"]');
    
    const finalCount = await page.locator('[data-testid="categoria-item"]').count();
    expect(finalCount).toBe(initialCount - 1);
  });
});