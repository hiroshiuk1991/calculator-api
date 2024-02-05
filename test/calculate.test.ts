import { calculate } from "../src/calculate";
import { Request, Response } from "express";

describe("calculate function", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      body: {
        operand1: 5,
        operand2: 3,
        operation: "+",
      },
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(() => mockResponse as Response),
    };
  });

  it("should handle valid request and perform addition", () => {
    calculate(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith({
      problem: { op1: 5, op2: 3, operation: "+" },
      solution: 8,
    });
  });

  it("should handle invalid operation", () => {
    mockRequest.body.operation = "invalid";
    calculate(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Invalid operation",
    });
  });
});
