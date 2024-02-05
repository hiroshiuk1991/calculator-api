import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

interface Request {
  operand1: number;
  operand2: number;
  operation: string;
}

interface Response {
  problem: {
    op1: number;
    op2: number;
    operation: string;
  };
  solution: number;
}

const operations: Record<string, (a: number, b: number) => number> = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

export function calculate(req: ExpressRequest, res: ExpressResponse) {
  const requestData: Request = req.body;

  const { operand1, operand2, operation } = requestData;

  const operationFunction = operations[operation];

  if (!operationFunction) {
    return res.status(400).json({ error: "Invalid operation" });
  }

  const solution = operationFunction(operand1, operand2);

  const responseData: Response = {
    problem: {
      op1: operand1,
      op2: operand2,
      operation,
    },
    solution,
  };

  res.json(responseData);
}
