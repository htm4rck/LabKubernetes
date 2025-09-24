const { test, expect } = require('@playwright/test');

test.describe('Gestión de Libros', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe mostrar la lista de libros', async ({ page }) => {
    await page.click('text=Libros');
    await expect(page.locator('h2')).toContainText('Libros');
    await expect(page.locator('[data-testid="libros-list"]')).toBeVisible();
  });

  test('debe crear un nuevo libro', async ({ page }) => {
    await page.click('text=Libros');
    await page.click('[data-testid="btn-nuevo-libro"]');
    
    await page.fill('[data-testid="input-titulo"]', 'Libro Test');
    await page.fill('[data-testid="input-autor"]', 'Autor Test');
    await page.fill('[data-testid="input-isbn"]', '978-84-376-0497-8');
    await page.selectOption('[data-testid="select-categoria"]', { index: 1 });
    
    await page.click('[data-testid="btn-guardar"]');
    
    await expect(page.locator('text=Libro Test')).toBeVisible();
  });

  test('debe filtrar libros por categoría', async ({ page }) => {
    await page.click('text=Libros');
    await page.selectOption('[data-testid="filtro-categoria"]', { index: 1 });
    
    const libros = page.locator('[data-testid="libro-item"]');
    await expect(libros.first()).toBeVisible();
  });

  test('debe buscar libros por título', async ({ page }) => {
    await page.click('text=Libros');
    await page.fill('[data-testid="input-buscar"]', 'Quijote');
    
    await expect(page.locator('text=Quijote')).toBeVisible();
  });

  test('debe mostrar detalles del libro', async ({ page }) => {
    await page.click('text=Libros');
    await page.click('[data-testid="btn-ver-detalle"]:first-child');
    
    await expect(page.locator('[data-testid="libro-detalle"]')).toBeVisible();
    await expect(page.locator('[data-testid="libro-titulo"]')).toBeVisible();
    await expect(page.locator('[data-testid="libro-autor"]')).toBeVisible();
    await expect(page.locator('[data-testid="libro-isbn"]')).toBeVisible();
  });
});