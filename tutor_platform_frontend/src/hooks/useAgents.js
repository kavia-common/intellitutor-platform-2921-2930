import { useEffect, useMemo, useState } from 'react';
import { agentsService } from '../services/agentsService';

// PUBLIC_INTERFACE
export function useAgents() {
  /** Manage agents and active selection. */
  const [agents, setAgents] = useState([]);
  const [activeAgentId, setActiveAgentId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    agentsService.listAgents().then((res) => {
      if (!mounted) return;
      setAgents(res);
      setActiveAgentId(res[0]?.id || null);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  const activeAgent = useMemo(
    () => agents.find((a) => a.id === activeAgentId) || null,
    [agents, activeAgentId]
  );

  return { agents, activeAgent, activeAgentId, setActiveAgentId, loading };
}
