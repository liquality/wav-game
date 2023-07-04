import { useEffect, useState } from "react";
import ContractService from "../services/ContractService";

export function useEarlyBirdInfo(gameId, level) {
  const [earlyBirdCount, setEarlyBirdCount] = useState(null);
  const [isEarlyBird, setIsEarlyBird] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (gameId && level && ContractService) {
        const _earlyBirdCount = await ContractService.earlyBirdCount(
          gameId,
          level
        );
        const _isEarlyBird = await ContractService.isEarlyBird(gameId, level);

        setEarlyBirdCount(_earlyBirdCount);
        setIsEarlyBird(_isEarlyBird);
      }
    };

    fetchData();
  }, []);

  return { earlyBirdCount, isEarlyBird, gameId, level };
}
