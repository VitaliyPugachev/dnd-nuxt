// Типы монет в D&D
type CoinType = 'copper' | 'silver' | 'electrum' | 'gold' | 'platinum';

// Значения монет в медных (медный стандарт)
const COIN_VALUES: Record<CoinType, number> = {
    copper: 1,
    silver: 10,
    electrum: 50,
    gold: 100,
    platinum: 1000
};

// Интерфейс для представления количества монет
interface CoinPurse {
    copper?: number;
    silver?: number;
    electrum?: number;
    gold?: number;
    platinum?: number;
}

class DnDTradingSystem {
    /**
     * Конвертирует сумму из одной валюты в другую
     * @param amount Исходная сумма
     * @param fromType Исходный тип монеты
     * @param toType Целевой тип монеты
     * @returns Результат конвертации
     */
    static convert(amount: number, fromType: CoinType, toType: CoinType): number {
        const valueInCopper = amount * COIN_VALUES[fromType];
        return valueInCopper / COIN_VALUES[toType];
    }

    /**
     * Вычисляет общую сумму в медных монетах
     * @param purse Кошелек с монетами
     * @returns Общая сумма в медных монетах
     */
    static getTotalInCopper(purse: CoinPurse): number {
        return (purse.copper || 0) * COIN_VALUES.copper +
               (purse.silver || 0) * COIN_VALUES.silver +
               (purse.electrum || 0) * COIN_VALUES.electrum +
               (purse.gold || 0) * COIN_VALUES.gold +
               (purse.platinum || 0) * COIN_VALUES.platinum;
    }

    /**
     * Проверяет, может ли игрок позволить себе покупку
     * @param playerPurse Кошелек игрока
     * @param price Цена товара (в виде кошелька)
     * @returns true, если у игрока достаточно средств
     */
    static canAfford(playerPurse: CoinPurse, price: CoinPurse): boolean {
        const playerTotal = this.getTotalInCopper(playerPurse);
        const priceTotal = this.getTotalInCopper(price);
        return playerTotal >= priceTotal;
    }

    /**
     * Оптимизирует кошелек, конвертируя мелкие монеты в более крупные
     * @param purse Кошелек с монетами
     * @returns Оптимизированный кошелек
     */
    static optimizePurse(purse: CoinPurse): CoinPurse {
        let totalCopper = this.getTotalInCopper(purse);
        
        const optimized: CoinPurse = {};
        
        // Конвертируем в платину
        optimized.platinum = Math.floor(totalCopper / COIN_VALUES.platinum);
        totalCopper %= COIN_VALUES.platinum;
        
        // Конвертируем в золото
        optimized.gold = Math.floor(totalCopper / COIN_VALUES.gold);
        totalCopper %= COIN_VALUES.gold;
        
        // Конвертируем в электрум
        optimized.electrum = Math.floor(totalCopper / COIN_VALUES.electrum);
        totalCopper %= COIN_VALUES.electrum;
        
        // Конвертируем в серебро
        optimized.silver = Math.floor(totalCopper / COIN_VALUES.silver);
        totalCopper %= COIN_VALUES.silver;
        
        // Остаток - в медные
        optimized.copper = totalCopper;
        
        // Удаляем нулевые значения
        return Object.fromEntries(
            Object.entries(optimized).filter(([_, value]) => value > 0)
        ) as CoinPurse;
    }

    /**
     * Покупает товар (вычитает цену из кошелька игрока)
     * @param playerPurse Кошелек игрока
     * @param price Цена товара (в виде кошелька)
     * @returns Обновленный кошелек игрока
     */
    static buyItem(playerPurse: CoinPurse, price: CoinPurse): CoinPurse {
        // Проверяем, может ли игрок позволить себе покупку
        if (!this.canAfford(playerPurse, price)) {
            throw new Error("У игрока недостаточно средств");
        }

        // Создаем копию кошелька
        const updatedPurse = {...playerPurse};

        // Вычитаем цену
        for (const [type, value] of Object.entries(price) as [CoinType, number][]) {
            if (updatedPurse[type] === undefined) updatedPurse[type] = 0;
            updatedPurse[type]! -= value;
            if (updatedPurse[type]! < 0) {
                // Если не хватает конкретного типа монет, конвертируем из других
                const missing = -updatedPurse[type]!;
                updatedPurse[type] = 0;
                this.convertAndDeduct(updatedPurse, type, missing);
            }
        }

        // Оптимизируем кошелек
        return this.optimizePurse(updatedPurse);
    }

    /**
     * Продает товар (добавляет цену в кошелек игрока)
     * @param playerPurse Кошелек игрока
     * @param price Цена продажи (в виде кошелька)
     * @returns Обновленный кошелек игрока
     */
    static sellItem(playerPurse: CoinPurse, price: CoinPurse): CoinPurse {
        // Создаем копию кошелька
        const updatedPurse = {...playerPurse};

        // Добавляем цену продажи
        for (const [type, value] of Object.entries(price) as [CoinType, number][]) {
            if (updatedPurse[type] === undefined) updatedPurse[type] = 0;
            updatedPurse[type]! += value;
        }

        // Оптимизируем кошелек
        return this.optimizePurse(updatedPurse);
    }

    /**
     * Вспомогательный метод для конвертации и вычитания недостающих монет
     * @param purse Кошелек игрока
     * @param targetType Тип монеты, которую нужно получить
     * @param amount Недостающее количество
     */
    private static convertAndDeduct(purse: CoinPurse, targetType: CoinType, amount: number): void {
        // Начинаем с самых крупных монет для минимального количества операций
        const typesByValue: CoinType[] = ['platinum', 'gold', 'electrum', 'silver', 'copper'];
        
        for (const sourceType of typesByValue) {
            if (sourceType === targetType) continue;
            
            if ((purse[sourceType] || 0) > 0) {
                // Сколько можем конвертировать из этого типа
                const sourceValue = COIN_VALUES[sourceType];
                const targetValue = COIN_VALUES[targetType];
                const exchangeRate = sourceValue / targetValue;
                
                const neededFromSource = Math.ceil(amount / exchangeRate);
                const available = purse[sourceType]!;
                const toUse = Math.min(neededFromSource, available);
                
                if (toUse > 0) {
                    purse[sourceType]! -= toUse;
                    const gained = toUse * exchangeRate;
                    amount -= gained;
                    
                    if (purse[targetType] === undefined) purse[targetType] = 0;
                    purse[targetType]! += gained;
                    
                    if (amount <= 0) break;
                }
            }
        }
        
        if (amount > 0) {
            throw new Error("Не удалось конвертировать достаточно монет");
        }
    }
}